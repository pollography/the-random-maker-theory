import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

function createThemeStore() {
	const storedTheme = isBrowser ? localStorage.getItem('theme') : null;
	const initialTheme = storedTheme || 'dark';

	const { subscribe, set } = writable(initialTheme);

	return {
		subscribe,
		setTheme: (theme) => {
			if (isBrowser) {
				localStorage.setItem('theme', theme);
				if (theme === 'dark') {
					document.documentElement.classList.add('dark');
					document.documentElement.setAttribute('data-theme', 'dark');
				} else {
					document.documentElement.classList.remove('dark');
					document.documentElement.setAttribute('data-theme', 'light');
				}
			}
			set(theme);
		},
		toggleTheme: () => {
			let newTheme = 'dark';
			subscribe((current) => {
				newTheme = current === 'dark' ? 'light' : 'dark';
			})();
			this.setTheme(newTheme);
		},
	};
}

export const theme = createThemeStore();
