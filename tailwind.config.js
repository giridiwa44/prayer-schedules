module.exports = {
  content: ["./index.html", "./**/*.js"],
  safelist: [
    {
      // Semua kombinasi bg, text, border, ring untuk warna-warna ini
      pattern: /(bg|text|border|ring)-(blue|yellow|orange|red|purple|green|islamic)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        islamic: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
    },
  },
  plugins: [],
};
