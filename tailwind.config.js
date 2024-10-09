/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px', 
      'md': '768px', 
      'lg': '1024px', 
      'xl': '1280px', 
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'custom-blue': '#16008B',
        'banner-blue':'#DAE5F5',
        'text-color':'#292929',
        'date-color':'#353535'
      },
    
    },
  },
  plugins: [],
}

