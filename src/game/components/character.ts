import type { Material } from 'excalibur';
import { Actor } from 'excalibur';
import game from '@/game/game';
import character from '@/game/materials/character.glsl';
import type Stage from '@/game/scenes/Stage';

export default class Character extends Actor {
	declare scene: Stage;
	protected material!: Material;

	protected initGraphics() {
		this.material = this.graphics.material = game.graphicsContext.createMaterial({
			name: 'character-material',
			fragmentSource: character,
		});
	}
}
