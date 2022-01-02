module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(224 ,242 ,254)",
        secondary: "white",
        secondaryDark: "#5b21b6",
        secondaryLight: "#8b5cf6",
        btnBlue: "rgb(6 ,182, 212)",
        btnRed: "rgb(220 ,38 ,38);",
      },
      width: {
        76: "19rem",
        80: "20rem",
        84: "21rem",
        88: "22rem",
        128: "32rem",
        132: "33rem",
        144: "36rem",
        152: "38rem",
        160: "40rem",
        192: "48rem",
      },
      height: {
        112: "28rem",
        120: "30rem",
        128: "32rem",
        132: "33rem",
        144: "36rem",
        152: "38rem",
        160: "40rem",
        192: "48rem",
      },
    },
  },
  plugins: [],
};
