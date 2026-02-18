/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Colors from CSS variables
                primary: 'var(--primary-color)',
                shadow: 'var(--shadow-color)',

                // Backgrounds
                background: 'var(--background)',
                'card-bg': 'var(--card-bg)',

                // Text
                'primary-text': 'var(--primary-text)',
                'secondary-text': 'var(--secondary-text)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
