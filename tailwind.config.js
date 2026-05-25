/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'space-black': '#050505',
                'gold-luck': '#FFD700',
                'teal-deep': '#0A7C8B',
                'teal-glow': '#4EC9D4',
                'gold-champagne': '#D4B78F',
                'gold-champagne-light': '#E8D9B8',
            },
            fontFamily: {
                manrope: ['Manrope', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
