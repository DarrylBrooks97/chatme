/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        lightSpeed: 'lightSpeed 2s linear infinite forwards',
      },
      keyframes: {
        lightSpeed: {
          '0%': { backgroundPosition: '0% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
    },
  },
  plugins: [],
};
