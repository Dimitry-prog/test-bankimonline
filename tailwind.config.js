/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'base-primary': '#161616',
      'base-secondary': '#242529',
      'text-primary': '#FFF',
      'text-dark-primary': '#161616',
      'text-disabled-text': '#848484',
      'base-stroke': '#333535',
      'base-inputs': '#2A2B31',
      'accent-primary': '#FBE54D',
      'accent-yellow-disabled': '#2D2D2D',
      red: '#E76143',
      transparent: 'transparent',
    },
    fontSize: {
      xs: ['12px', '140%'],
      sm: ['14px', '140%'],
      md: ['16px', '140%'],
      lg: ['20px', '140%'],
      xl: ['31px', 'normal'],
      '2xl': ['48px', 'normal'],
    },
    fontFamily: {
      roboto: ['"Roboto"', 'sans-serif'],
      inter: ['"Inter"', 'sans-serif'],
    },
    boxShadow: {
      md: '0px 8px 32px 0px rgba(0, 0, 0, 0.16);',
    },
    extend: {
      content: {
        currency: 'url("/currencies.svg")',
      },
    },
  },
  plugins: [],
};
