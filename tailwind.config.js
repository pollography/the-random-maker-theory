// The Random Maker Theory — Tailwind CSS Configuration
// Dark Grain Moody + Claymorphism aesthetic

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,svelte,js,ts,md}',
		'./src/content/**/*.md'
	],
	theme: {
		extend: {
			colors: {
				// Neutral base colors
				bg: 'var(--color-bg)',
				surface: 'var(--color-surface)',
				'surface-raised': 'var(--color-surface-raised)',
				border: 'var(--color-border)',
				'border-subtle': 'var(--color-border-subtle)',

				// Text colors
				text: {
					DEFAULT: 'var(--color-text)',
					muted: 'var(--color-text-muted)',
					dim: 'var(--color-text-dim)',
				},

				// Primary accent: Honey
				honey: {
					DEFAULT: 'var(--color-accent-honey)',
					hover: 'var(--color-accent-honey-hover)',
					subtle: 'var(--color-accent-honey-subtle)',
					glow: 'var(--color-accent-honey-glow)',
				},

				// Secondary accent: Teal
				teal: {
					DEFAULT: 'var(--color-accent-teal)',
					hover: 'var(--color-accent-teal-hover)',
					subtle: 'var(--color-accent-teal-subtle)',
					glow: 'var(--color-accent-teal-glow)',
				},

				// Semantic colors
				danger: {
					DEFAULT: 'var(--color-danger)',
					subtle: 'var(--color-danger-subtle)',
				},
				success: 'var(--color-success)',
				warning: 'var(--color-warning)',

				// Contrast
				'on-accent': 'var(--color-on-accent)',
			},

			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				display: ['Montserrat', 'Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
			},

			fontSize: {
				xs: ['10px', { lineHeight: '1.25' }],
				sm: ['12px', { lineHeight: '1.25' }],
				base: ['14px', { lineHeight: '1.5' }],
				md: ['16px', { lineHeight: '1.5' }],
				lg: ['20px', { lineHeight: '1.5' }],
				xl: ['24px', { lineHeight: '1.25' }],
				'2xl': ['32px', { lineHeight: '1.25' }],
				'3xl': ['40px', { lineHeight: '1.1' }],
				'4xl': ['48px', { lineHeight: '1.1' }],
			},

			fontWeight: {
				light: '300',
				regular: '400',
				medium: '500',
				semibold: '600',
				bold: '700',
				extrabold: '800',
			},

			spacing: {
				0: '0',
				1: '4px',
				2: '8px',
				3: '12px',
				4: '16px',
				5: '20px',
				6: '24px',
				7: '32px',
				8: '40px',
				9: '48px',
				10: '56px',
				11: '64px',
				12: '80px',
				16: '128px',
			},

			borderRadius: {
				sm: '6px',
				md: '8px',
				lg: '12px',
				xl: '16px',
				'2xl': '20px',
				full: '99px',
			},

			boxShadow: {
				card: 'var(--shadow-card)',
				elevated: 'var(--shadow-elevated)',
				'glow-honey': 'var(--shadow-glow-honey)',
				'glow-teal': 'var(--shadow-glow-teal)',
				neo: 'var(--shadow-neo)',
				'neo-sm': 'var(--shadow-neo-sm)',
				'neo-inset': 'var(--shadow-neo-inset)',
			},

			letterSpacing: {
				tight: '-0.03em',
				normal: '0',
				wide: '0.06em',
				wider: '0.12em',
			},

			lineHeight: {
				tight: '1.1',
				snug: '1.25',
				normal: '1.5',
				relaxed: '1.65',
			},

			zIndex: {
				base: '0',
				card: '1',
				dropdown: '10',
				sticky: '50',
				overlay: '100',
				modal: '200',
				toast: '300',
			},

			transitionDuration: {
				fast: '150ms',
				normal: '250ms',
				slow: '400ms',
			},

			animation: {
				'pulse-honey': 'pulse-honey 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'glow-honey': 'glow-honey 2s ease-in-out infinite',
				'fade-in': 'fade-in 300ms ease-out',
				'slide-in': 'slide-in 250ms ease-out',
			},

			keyframes: {
				'pulse-honey': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				'glow-honey': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 137, 62, 0.7)' },
					'50%': { boxShadow: '0 0 0 10px rgba(212, 137, 62, 0)' },
				},
				'fade-in': {
					'from': { opacity: '0' },
					'to': { opacity: '1' },
				},
				'slide-in': {
					'from': { transform: 'translateY(10px)', opacity: '0' },
					'to': { transform: 'translateY(0)', opacity: '1' },
				},
			},

			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						color: theme('colors.text.DEFAULT'),
						a: {
							color: theme('colors.honey.DEFAULT'),
							'&:hover': {
								color: theme('colors.honey.hover'),
							},
						},
						h1: {
							color: theme('colors.text.DEFAULT'),
							fontFamily: theme('fontFamily.display').join(', '),
						},
						h2: {
							color: theme('colors.text.DEFAULT'),
							fontFamily: theme('fontFamily.display').join(', '),
						},
						h3: {
							color: theme('colors.text.DEFAULT'),
							fontFamily: theme('fontFamily.display').join(', '),
						},
						h4: {
							color: theme('colors.text.DEFAULT'),
							fontFamily: theme('fontFamily.display').join(', '),
						},
						strong: {
							color: theme('colors.text.DEFAULT'),
						},
						code: {
							color: theme('colors.text.DEFAULT'),
							backgroundColor: theme('colors.surface-raised'),
							padding: '0.25rem 0.5rem',
							borderRadius: '0.375rem',
						},
						'code::before': {
							content: 'none',
						},
						'code::after': {
							content: 'none',
						},
						pre: {
							backgroundColor: theme('colors.surface-raised'),
							color: theme('colors.text.DEFAULT'),
							border: `1px solid ${theme('colors.border')}`,
						},
						blockquote: {
							borderLeftColor: theme('colors.honey.DEFAULT'),
							color: theme('colors.text.muted'),
						},
						hr: {
							borderColor: theme('colors.border'),
						},
						'ul > li::before': {
							backgroundColor: theme('colors.honey.DEFAULT'),
						},
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
