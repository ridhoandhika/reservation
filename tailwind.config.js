import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.tsx',
        './resources/js/**/*.js',
        './resources/js/**/*.ts',
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            extend: {
                fontFamily: {
                    sans: [...defaultTheme.fontFamily.sans],
                },
            },
        }
    },
    darkMode: "class",
    plugins: [
        forms,
        heroui(),
    ]
}
