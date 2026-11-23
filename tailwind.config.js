export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { encre: '#FBF8F3', nuit: '#F3ECE1', ivoire: '#1E1A16', or: '#7E5E30', ordoux: '#634820', brume: '#5E564B' },
      fontFamily: { serif: ['"Cormorant Garamond"', 'Georgia', 'serif'], sans: ['Inter', 'Arial', 'sans-serif'] },
      keyframes: {
        defile: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        brille: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
      animation: { defile: 'defile 40s linear infinite', brille: 'brille 4s linear infinite' },
    },
  },
}
