/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main: '#2273B8',
        second: '#47019d',
        three: '#e00256',
        // black: '#212121',
        black: '#454545',
        white: '#ffffff',
        gray: '#808080e2',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        lobster: ['Lobster', 'cursive'],
      },
      lineHeight: {
        // 'extra-loose': '2.5',
        // 12: '3rem',
      },
    },
  },
  plugins: [require('daisyui')],
};
