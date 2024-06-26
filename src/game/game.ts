import {
	Actor,
	Animation,
	AnimationStrategy,
	Buttons,
	clamp,
	Color,
	coroutine,
	DisplayMode,
	Engine,
	FadeInOut,
	Gamepad,
	PointerScope,
	ScrollPreventionMode,
	Vector,
} from 'excalibur';
import config from '@/config';
import { Pane } from 'tweakpane';
import res from '@/res';
import { globalInputMapping } from '@/buttons.config';
import { addToArrayWithoutDuplication } from '@/game/utils';
import { GLOBAL_KEYS_EVENTS } from '@/enums';
import { bones, input } from '@/stores';
import Stage from '@/game/scenes/Stage';
import { Animations } from '@/game/resources/animations';
import CustomLoader from '@/game/loader';

class Game extends Engine {
	private gamepad!: Gamepad | null;

	constructor() {
		super({
			viewport: {
				width: 1920,
				height: 1080,
			},
			canvasElementId: 'game',
			enableCanvasTransparency: false,
			snapToPixel: true,
			suppressConsoleBootMessage: true,
			suppressPlayButton: true,
			pointerScope: PointerScope.Canvas,
			scrollPreventionMode: ScrollPreventionMode.All,
			displayMode: DisplayMode.FitScreen,
			backgroundColor: Color.fromHex('#30322A'),
			antialiasing: true,
			scenes: {
				stage: {
					scene: Stage,
					transitions: {
						in: new FadeInOut({ duration: 500, direction: 'in', color: Color.fromHex('#30322A') }),
						out: new FadeInOut({ duration: 500, direction: 'out', color: Color.fromHex('#30322A') }),
					},
				},
			},
		});

		config.showFps && this.showFpsCounter();
		config.debug && this.activateDebug();
	}

	onInitialize() {
		this.registerEvents();
	}

	public start() {
		const loader = new CustomLoader();
		loader.addResources(Object.values(res));

		return super.start(loader);
	}

	waitFor(time: number): Promise<void> {
		return new Promise(res => {
			this.clock.schedule(() => res(), time);
		});
	}

	restore() {
		// Start the excalibur clock which drives the mainloop
		this.browser.resume();
		this.clock.start();
	}

	tween(
		cb: (progress: number) => void,
		duration: number,
		abortController = new AbortController(),
		endless = false,
	) {
		const signal = abortController.signal;

		// @ts-ignore
		return coroutine(this, function* (): Generator<void, void, number> {
			let totalTime = 0;

			while (!signal.aborted) {
				let elapsed = yield;
				totalTime += elapsed;

				const tt = endless ? (totalTime % duration) / duration : totalTime / duration;
				const currentTime = clamp(tt, 0, 1);

				cb && cb(currentTime);

				if (!endless && totalTime >= duration) return;
			}
		});
	}

	playAnimation(actor: Actor, animation: Animations, strategy: AnimationStrategy = AnimationStrategy.Loop) {
		return new Promise(resolve => {
			const sprite = <Animation>res.animation.getAnimation(animation, strategy)?.clone();

			sprite.reset();
			sprite.play();

			actor.graphics.use(sprite, {
				anchor: sprite.origin || Vector.Zero,
			});

			sprite.canFinish && sprite.events.on('end', resolve);
		});
	}

	registerEvents() {
		this.input.gamepads.on('connect', () => {
			input.connectGamepad();
			this.gamepad = this.input.gamepads.at(0);
		});
		this.input.gamepads.on('disconnect', () => {
			input.disconnectGamepad();
			this.gamepad = null;
		});

		this.inputMapper.on(
			({ gamepads, keyboard }) => {
				const events: {
					isHeld: (keyof typeof globalInputMapping)[];
					wasPressed: (keyof typeof globalInputMapping)[];
					wasReleased: (keyof typeof globalInputMapping)[];
				} = {
					isHeld: [],
					wasPressed: [],
					wasReleased: [],
				};

				for (let event in globalInputMapping) {
					// @ts-ignore
					const { gamepad, keys, pointer } = globalInputMapping[event];

					if (gamepad) {
						if (gamepad.filter((button: Buttons) => gamepads.at(0).isButtonHeld(button)).length)
							events.isHeld = addToArrayWithoutDuplication(events.isHeld, event);
						if (gamepad.filter((button: Buttons) => gamepads.at(0).wasButtonPressed(button)).length)
							events.wasPressed = addToArrayWithoutDuplication(events.wasPressed, event);
						if (
							gamepad.filter((button: Buttons) => gamepads.at(0).wasButtonReleased(button)).length
						)
							events.wasReleased = addToArrayWithoutDuplication(events.wasReleased, event);
					}

					if (keys) {
						for (let key of keys) {
							if (keyboard.isHeld(key))
								events.isHeld = addToArrayWithoutDuplication(events.isHeld, event);
							if (keyboard.wasPressed(key))
								events.wasPressed = addToArrayWithoutDuplication(events.wasPressed, event);
							if (keyboard.wasReleased(key))
								events.wasReleased = addToArrayWithoutDuplication(events.wasReleased, event);
						}
					}

					if (pointer) {
					}
				}

				return events;
			},
			events => {
				if (events.wasPressed.length)
					for (let event of events.wasPressed)
						this.events.emit(GLOBAL_KEYS_EVENTS.wasPressed, event);
				if (events.wasReleased.length)
					for (let event of events.wasReleased)
						this.events.emit(GLOBAL_KEYS_EVENTS.wasReleased, event);
				if (events.isHeld.length)
					for (let event of events.isHeld) this.events.emit(GLOBAL_KEYS_EVENTS.isHeld, event);
			},
		);
	}

	async play() {
		bones.reset();
		await this.goToScene('stage');
	}

	private showFpsCounter() {
		const fpsPane = new Pane();
		fpsPane.addBinding(this.clock.fpsSampler, 'fps', {
			readonly: true,
			min: 20,
		});
	}

	private activateDebug() {
		this.debug.entity.showId = false;
		this.debug.collider.showGeometry = true;
		this.debug.transform.showPosition = true;

		this.showDebug(true);
	}
}

const game = new Game();

export default game;
