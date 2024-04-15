import 'normalize.css';
import '@/ui/style/app.scss';
import App from '@/ui/App.svelte';
import game from '@/game/game';
import { screen } from '@/stores';

class Main {
	constructor() {
		this.startGame();
	}

	async startGame() {
		await game.start();
		this.initUi();
		await game.play();
		screen.game();
	}

	initUi() {
		new App({
			target: document.getElementById('ui')!,
		});
	}
}

new Main();
