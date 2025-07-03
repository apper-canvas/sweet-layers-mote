/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4729A',
        secondary: '#F5E6D3',
        accent: '#8B4C70',
        surface: '#FFFFFF',
        background: '#FFF9F5',
        success: '#7FB069',
        warning: '#F4A259',
        error: '#E63946',
        info: '#6B9BD2',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'cart-bounce': 'cart-bounce 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        'cart-bounce': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
    },
  },
  plugins: [],
}