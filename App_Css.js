import transform from "css-to-react-native-transform";

const AppCss = transform(
  `
  .container{
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "grey",
    alignItems: "center",
    height: 600
  },
  .redbox {
    width: 100,
    height: 100,
    backgroundColor: "red"
  },
  .bluebox {
    width: 100,
    height: 100,
    backgroundColor: "blue"
  },
  .blackbox {
    width: 100,
    height: 100,
    backgroundColor: "black"
  }
`,
  { parseMediaQueries: true }
);

export default AppCss;
