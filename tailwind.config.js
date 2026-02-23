/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F9F7F4',
        'cream-nav': '#FAFAF8',
        charcoal: '#1C1C1E',
        green: '#3D5A3E',
        navy: '#1A2332',
        gold: '#C4933F',
        'warm-grey': '#E5E0D8',
        'muted-grey': '#888888',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.15', fontWeight: '700' }],
        'section': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'subsection': ['22px', { lineHeight: '1.3', fontWeight: '700' }],
        'body': ['17px', { lineHeight: '1.6' }],
        'label': ['12px', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '0.06em' }],
        'nav': ['15px', { lineHeight: '1.4', fontWeight: '500' }],
        'stat': ['46px', { lineHeight: '1.1', fontWeight: '700' }],
        'stat-sm': ['36px', { lineHeight: '1.1', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
};
