/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js}',
  ],
  safelist: [
   
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        'cat': {
         
        },
        'custom-bg': '#F8F3ED', 
        'custom-dark': '#4A4A4A', 
        'custom-accent': '#F4A261', 
        'custom-card': '#FFF6E5', 
      },
    },
    boxShadow: {
      'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      'header': '0 10px 5px 0 rgba(0, 0, 0, 0.2)',
      'footer': '0 -5px 5px 0 rgba(0, 0, 0, 0.2)',
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        catTheme: {
          "primary": "#8D6E63", 
          "secondary": "#4A4A4A", 
          "accent": "#F4A261", 
          "neutral": "#FFF6E5", 
          "base-100": "#F8F3ED", 
          "info": "#B0BEC5", 
          "success": "#4CAF50", 
          "warning": "#FFB74D", 
          "error": "#D32F2F", 
        }
      },
    ],
  },
}
