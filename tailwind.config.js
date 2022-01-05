module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5FAFF",
        secondary: "white",
        secondaryDark: "#5b21b6",
        secondaryLight: "#8b5cf6",
        btnBlue: "#0071FF",
        btnRed: "rgb(220 ,38 ,38);",
        subText:"#A0A3A3",
        inputbg:"#F6F5FA",
        inputText:"#9B9B9B",
        walletbg1:"#FFEEDE",
        walletbg2:"#EAF4FF"
      },
      width: {
        42: "10.5rem",
        46: "11.5rem",
        76: "19rem",
        80: "20rem",
        84: "21rem",
        88: "22rem",
        112: "28rem",
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
