require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/screens/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        danger: '#EC2D30',
        warning: '#E88B00',
        success: '#07B96F',
        primary: '#3085FE',
      },
    },
  },
};
