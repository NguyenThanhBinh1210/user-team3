/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      mobile: { min: '350px', max: '767px' },
      tablet: { min: '768px', max: '1024px' }
    }
  }
}
