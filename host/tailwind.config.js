module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // Remote — ensures all Tailwind utility classes used by Auth-Remote are
    // included in the host's CSS bundle so they aren't purged away.
    "../Auth-Remote/src/**/*.{js,jsx,ts,tsx}",
    "../Analytics-Remote/src/**/*.{js,jsx,ts,tsx}",
    "../SubmitIdea-Remote/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["DM Sans", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
      },
    },
  },
  plugins: [],
};