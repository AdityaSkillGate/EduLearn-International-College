import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0F0728', // Deepest Royal Plum/Midnight
          900: '#1D0D44', // Imperial Royal Purple
          800: '#2F1566', // Deep Vibrant Violet
          700: '#451D8F', // Royal Purple
          600: '#5C24B8', // Luminous Purple
          500: '#6B21A8', // EduLearn Signature Purple (Logo "E" & "Learn")
        },
        gold: {
          100: '#FFF7ED', // Warm Orange Tint
          200: '#FFEDD5',
          300: '#FED7AA',
          400: '#FB923C', // Solar Glow Orange
          500: '#F97316', // EduLearn Vibrant Solar Orange (Logo "L" & "Edu")
          600: '#EA580C', // EduLearn Action Orange
          700: '#C2410C', // High-contrast Deep Orange (> 6.0:1 on white)
          800: '#9A3412',
          900: '#7C2D12',
        },
        brand: {
          purple: '#6B21A8',
          orange: '#EA580C',
          green: '#65A30D',
          dark: '#0F0728',
        },
        alabaster: '#FAF9FF',
        royal: {
          500: '#7C3AED',
          600: '#6D28D9', // Vibrant Action Purple
          700: '#581C87',
        },
      },
      fontFamily: {
        serif: [
          'var(--font-playfair)',
          'Playfair Display',
          'Noto Serif SC',
          'Noto Serif Tamil',
          'Georgia',
          'Cambria',
          'serif',
        ],
        sans: [
          'var(--font-sans)',
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Microsoft YaHei',
          'Noto Sans Tamil',
          'sans-serif',
        ],
      },
      boxShadow: {
        'prestige': '0 10px 30px -10px rgba(10, 25, 47, 0.12)',
        'prestige-lg': '0 20px 40px -15px rgba(10, 25, 47, 0.2)',
        'gold-glow': '0 0 25px rgba(197, 168, 128, 0.25)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
