import 'normalize.css';
import '@/ui/style/app.scss';
import App from '@/ui/App.svelte';
import game from '@/game/game';
import { screen } from '@/stores';

class Main {
	constructor() {
		this.startGame();
		this.initUi();
		screen.game();
	}

	async startGame() {
		return game.start();
	}

	initUi() {
		new App({
			target: document.getElementById('ui')!,
		});
	}
}

new Main();
