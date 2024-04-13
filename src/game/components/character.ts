import { Actor, Engine } from 'excalibur';
import game from '@/game/game';
import character from '@/game/materials/character.glsl';

export default class Character extends Actor {
	onInitialize(engine: Engine) {
		super.onInitialize(engine);

		this.initGraphics();
		this.registerEvents();
	}

	protected registerEvents() {}

	protected initGraphics() {
		this.graphics.material = game.graphicsContext.createMaterial({
			name: 'character-material',
			fragmentSource: character,
		});
	}
}
