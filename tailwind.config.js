/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': 'hsl(210, 90%, 50%)',
        'primary-hover': 'hsl(210, 90%, 60%)',
        'primary-focus': 'hsl(210, 90%, 40%)',
        'background-light': 'hsl(220, 20%, 97%)',
        'background-dark': 'hsl(220, 20%, 10%)',
        'card-light': 'hsl(0, 0%, 100%)',
        'card-dark': 'hsl(220, 20%, 15%)',
        'text-light': 'hsl(220, 15%, 25%)',
        'text-dark': 'hsl(220, 15%, 85%)',
        'text-muted-light': 'hsl(220, 10%, 50%)',
        'text-muted-dark': 'hsl(220, 10%, 60%)',
        'border-light': 'hsl(220, 15%, 90%)',
        'border-dark': 'hsl(220, 15%, 20%)',
      },
    }
  },
  plugins: [],
}