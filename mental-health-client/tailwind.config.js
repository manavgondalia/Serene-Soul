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
	plugins: [
		// function ({ addUtilities }) {
		// 	const newUtilities = {
		// 		".scrollbar-thin": {
		// 			scrollbarWidth: "thin",
		// 			scrollbarColor: "rgb(31 29 29) white",
		// 		},
		// 		".scrollbar-webkit": {
		// 			"&::-webkit-scrollbar": {
		// 				width: "8px",
		// 			},
		// 			"&::-webkit-scrollbar-track": {
		// 				background: "white",
		// 			},
		// 			"&::-webkit-scrollbar-thumb": {
		// 				backgroundColor: "rgb(31 41 55)",
		// 				borderRadius: "20px",
		// 				border: "1px solid white",
		// 			},
		// 		},
		// 	};
		// 	addUtilities(newUtilities, ["responsive", "hover"]);
		// },
	],
};
