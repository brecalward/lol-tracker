/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			minWidth: {
				128: "32rem",
			},
		},
	},
	plugins: [],
};
