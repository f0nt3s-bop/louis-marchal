export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { encre: '#0E0E11', nuit: '#16161B', ivoire: '#F3EDE3', or: '#C9A96E', ordoux: '#E6D3A8', brume: '#A39E94' },
      fontFamily: { serif: ['"Cormorant Garamond"', 'Georgia', 'serif'], sans: ['Inter', 'Arial', 'sans-serif'] },
      keyframes: {
        defile: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        brille: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
      animation: { defile: 'defile 40s linear infinite', brille: 'brille 4s linear infinite' },
    },
  },
}
