/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F1B3D',
          50: '#EEF1F8',
          100: '#D6DCEC',
          200: '#A9B6D4',
          300: '#7A8AB4',
          400: '#4A5A89',
          500: '#22305C',
          600: '#16234A',
          700: '#0F1B3D',
          800: '#0A1330',
          900: '#060B1C',
        },
        hydrangea: {
          DEFAULT: '#A9C2DE',
          50: '#F3F7FB',
          100: '#E3ECF6',
          200: '#CBDCEF',
          300: '#A9C2DE',
          400: '#86A7CD',
          500: '#5C7FB8',
          600: '#44639A',
        },
        silver: {
          100: '#F1F2F3',
          300: '#DBDEE1',
          500: '#C7CCD1',
          700: '#8A9097',
        },
        linen: {
          DEFAULT: '#F7F4EE',
          dark: '#EFEAE0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        script: ['"Cormorant Garamond"', 'serif'],
        accent: ['"Parisienne"', 'cursive'],
        body: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      animation: {
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 13s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
      },
    },
  },
  plugins: [],
}
