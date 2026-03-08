
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    // Add other paths as needed for your project
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': 'var(--color-warm-white)',
        'coffee': 'var(--color-coffee)',
        'mustard': 'var(--color-mustard)',
        'tomato': 'var(--color-tomato)',
        'basil': 'var(--color-basil)',
        'cream': 'var(--color-cream)',
        'dark': 'var(--color-dark)',
        'gray-text': 'var(--color-gray-text)',
      },
      fontFamily: {
        'display': 'var(--font-display)',
        'body': 'var(--font-body)',
        'label': 'var(--font-label)',
      },
    },
  },
  plugins: [],
}