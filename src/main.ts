import 'normalize.css';
import '@/ui/style/app.scss';
import App from '@/ui/App.svelte';
import game from '@/game/game';

class Main {
	constructor() {
		this.startGame();
	}

	async startGame() {
		await game.start();
		this.initUi();
		await game.play();
	}

	initUi() {
		new App({
			target: document.getElementById('ui')!,
		});
	}
}

new Main();
