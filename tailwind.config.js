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
        'primary': {
          DEFAULT: 'hsl(214, 89%, 52%)',
          hover: 'hsl(214, 89%, 60%)',
          focus: 'hsl(214, 89%, 45%)',
          subtle: {
            DEFAULT: 'hsl(214, 89%, 95%)',
            dark: 'hsla(214, 89%, 52%, 0.1)'
          }
        },
        'background': {
          light: 'hsl(210, 20%, 98%)',
          dark: 'hsl(220, 20%, 12%)',
        },
        'card': {
          light: 'hsl(0, 0%, 100%)',
          dark: 'hsl(220, 20%, 16%)',
        },
        'text': {
          light: 'hsl(220, 15%, 25%)',
          dark: 'hsl(210, 15%, 88%)',
          muted: {
            light: 'hsl(220, 10%, 50%)',
            dark: 'hsl(210, 10%, 65%)',
          }
        },
        'border': {
          light: 'hsl(210, 15%, 92%)',
          dark: 'hsl(220, 15%, 22%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
      },
    }
  },
  plugins: [],
}