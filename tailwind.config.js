module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
      },
      fontSize: {
        ssm: [
          "10px",
          {
            letterSpacing: ".01em",
            lineHeight: "10px",
          },
        ],
        "2xl": [
          "32px",
          {
            letterSpacing: "-0.01em",
            lineHeight: "30px",
          },
        ],
        "3xl": [
          "40px",
          {
            letterSpacing: "-0.02em",
            lineHeight: "40px",
          },
        ],
        "4xl": [
          "70px",
          {
            letterSpacing: "-0.02em",
            lineHeight: "80px",
          },
        ],
      },
    },
  },
  plugins: [],
};
