import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/** @typedef {'dark' | 'light'} Theme */

function createThemeStore() {
	const storedTheme = browser ? localStorage.getItem('theme') : null;
	/** @type {Theme} */
	const initialTheme = storedTheme === 'light' ? 'light' : 'dark';

	const { subscribe, set, update } = writable(initialTheme);

	// Apply theme on initial load
	if (browser) {
		if (initialTheme === 'dark') {
			document.documentElement.classList.add('dark');
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.setAttribute('data-theme', 'light');
		}
	}

	/** @param {Theme} newTheme */
	function setTheme(newTheme) {
		if (browser) {
			localStorage.setItem('theme', newTheme);
			if (newTheme === 'dark') {
				document.documentElement.classList.add('dark');
				document.documentElement.setAttribute('data-theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				document.documentElement.setAttribute('data-theme', 'light');
			}
		}
		set(newTheme);
	}

	function toggleTheme() {
		update((current) => {
			const newTheme = current === 'dark' ? 'light' : 'dark';
			setTheme(newTheme);
			return newTheme;
		});
	}

	return {
		subscribe,
		setTheme,
		toggleTheme,
	};
}

export const theme = createThemeStore();
