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
            },
            fontFamily: {
                manrope: ['Manrope', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
