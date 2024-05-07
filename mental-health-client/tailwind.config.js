/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			fontFamily: {
				grostek: ["grostek", "sans-serif"],
				zodiak: ["zodiak", "sans-serif"],
				lts: ["lts", "sans-serif"],
				cabinet: ["cabinet", "sans-serif"],
			},
		},
	},
	plugins: [],
};
