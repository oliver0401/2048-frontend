/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /^bg-tile-(2|4|8|16|32|64|128|256|512|1024|2048)$/,
      variants: ['dark']
    },
    {
      pattern: /^text-(foreground|primary)$/,
      variants: ['dark']
    }
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        black: '#000000',
        white: '#ffffff',
        primary: {
          DEFAULT: '#776e65',
          dark: '#ec9050'
        },
        secondary: {
          DEFAULT: '#bbada0',
          dark: '#222831'
        },
        tertiary: {
          DEFAULT: '#eee4da',
          dark: '#4c5f7a'
        },
        foreground: {
          DEFAULT: '#ffffff',
          dark: '#ffffff'
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#000000'
        },
        backdrop: '#edc22e',
        tile: {
          2: {
            DEFAULT: '#eeeeee',
            dark: '#e0e0e0'
          },
          4: {
            DEFAULT: '#eeeecc',
            dark: '#e0e0c0'
          },
          8: {
            DEFAULT: '#ffbb88',
            dark: '#f0b080'
          },
          16: {
            DEFAULT: '#ff9966',
            dark: '#f09060'
          },
          32: {
            DEFAULT: '#ff7755',
            dark: '#f07050'
          },
          64: {
            DEFAULT: '#ff5533',
            dark: '#f05030'
          },
          128: {
            DEFAULT: '#eecc77',
            dark: '#e0c070'
          },
          256: {
            DEFAULT: '#eecc66',
            dark: '#e0c060'
          },
          512: {
            DEFAULT: '#eecc55',
            dark: '#e0c050'
          },
          1024: {
            DEFAULT: '#eecc33',
            dark: '#e0c030'
          },
          2048: {
            DEFAULT: '#eecc11',
            dark: '#e0c010'
          }
        }
      },
      borderRadius: {
        DEFAULT: '3px',
      },
      animation: {
        'expand': 'expand 0.2s forwards',
        'pop': 'pop 0.18s forwards',
        'fade-out': 'fadeOut 0.5s forwards'
      },
      keyframes: {
        expand: {
          'from': { transform: 'scale(0.2)' },
          'to': { transform: 'scale(1)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeOut: {
          'from': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
          'to': { 
            transform: 'translateY(-50px)',
            opacity: '0'
          },
        }
      }
    },
  },
  plugins: [],
}

