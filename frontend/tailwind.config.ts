import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0B0F17',
          card: '#121826',
          elevated: '#1A2234',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          orange: '#FF6A00',
          cyan: '#00F2FE',
          violet: '#7928CA',
          dark: '#0B0F17',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
        glass: '20px',
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 106, 0, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.3)',
        'glow-violet': '0 0 25px -5px rgba(121, 40, 202, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
