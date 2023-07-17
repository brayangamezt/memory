/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        logoAnimation:{
          '0%': {transform: 'translateY(-100%)'},
          '100%':{ transform: 'translateY(0%)' }
        },
        buttonAnimation:{
          '0%': {transform: 'translateY(200%)'},
          '100%': {transform: 'translateY(0%)'}
        },
        bounce:{
          '0%':{transform: 'scale(1,1) translate(0px,0px)'},
          '30%':{transform: 'scale(1,0.8) translate(0px, 5px)'},
          '75%': {transform: 'scale(1,1.1) translate(0px, -5px) '},
          '100%': {transform: 'scale(1,1) translate(0px, 0px) '},
        }
      },
      animation:{
        logoAnimation:'logoAnimation 2s linear',
        buttonAnimation: 'buttonAnimation 2s linear',
        bounce: 'bounce 1s infinite'
      }
    },
  },
  plugins: [],
}

