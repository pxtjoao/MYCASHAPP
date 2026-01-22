/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Semantic Tokens
                primary: {
                    500: '#D7FF00', // Lime
                },
                secondary: {
                    900: '#060A11', // Dark Text/Bg
                    50: '#E7E8EA',  // Light Elements
                },
                surface: {
                    500: '#FFFFFF',
                },
                background: {
                    400: '#F5F6F8',
                },

                // Primitive Tokens
                neutral: {
                    0: '#FFFFFF',
                    300: '#E5E7EB',
                    400: '#D1D5DB',
                    500: '#9CA3AF',
                    1100: '#080B12',
                },
                brand: {
                    700: '#C4E703',
                },
                blue: {
                    600: '#2A89EF',
                },
                green: {
                    600: '#15BE78',
                },
                red: {
                    600: '#E61E32',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            screens: {
                'md': '768px',   // Tablet
                'lg': '1280px',  // Desktop (Sidebar visible)
                'xl': '1920px',  // Wide / 4K
            }
        },
    },
    plugins: [],
}
