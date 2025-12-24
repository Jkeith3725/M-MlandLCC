import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          dark: '#2B1D14', // Dark brown
          DEFAULT: '#2B1D14',
        },
        // Mapped Forest colors to match usage in components
        forest: {
          50: '#f0f7f0',
          100: '#d9ead9',
          200: '#b3d5b3',
          300: '#8cc08c',
          400: '#66ab66',
          500: '#1F4D2B', // Brand Forest
          600: '#193e23',
          700: '#14301b',
          800: '#0f2314',
          900: '#09150c', // Darkest forest used in Hero/Footer
        },
        green: {
          forest: '#1F4D2B',
          DEFAULT: '#1F4D2B',
        },
        tan: {
          accent: '#C8A26A',
          DEFAULT: '#C8A26A',
        },
        // Mapped Earth colors for Footer icons
        earth: {
          300: '#C8A26A', // Matches tan accent
          400: '#b08d5a',
        },
        cream: {
          DEFAULT: '#F6F2EA',
          dark: '#EDE7DC',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(43, 29, 20, 0.08)',
        'medium': '0 4px 16px rgba(43, 29, 20, 0.12)',
        'strong': '0 8px 24px rgba(43, 29, 20, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        skeleton: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
export default config
