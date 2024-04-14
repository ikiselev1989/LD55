import { Random } from 'excalibur';

export const random = new Random();

export const canUseWebP = () => {
	const elem = document.createElement('canvas');
	if (!!(elem.getContext && elem.getContext('2d'))) {
		return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
	}
	return false;
};

export const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(val, min));

export const lerp = (start: number, end: number, time: number) => start * (1 - time) + end * time;

export const addToArrayWithoutDuplication = (arr: any[], val: any) => {
	return [...new Set([...arr, val])];
};

export const easeInOutSine = (x: number): number => -(Math.cos(Math.PI * x) - 1) / 2;
