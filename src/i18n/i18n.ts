import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next';
import en from '@/i18n/lang/en';
import ru from '@/i18n/lang/ru';

i18next.init({
	lng: navigator.language === 'ru-RU' ? 'ru' : 'en',
	resources: {
		en,
		ru,
	},
	interpolation: {
		escapeValue: false,
	},
});

const i18n = createI18nStore(i18next);

export default i18n;
