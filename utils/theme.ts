import { extendTheme } from "@chakra-ui/react";

const colors = Object.freeze({
  bg: {
    white: "#fff",
  },
  brand: {
    main: "#CFE5FF",
    green: "#34D1BF",
    white: "#fff",
    gray: "#9FA2B4",
    purple: "#6c63ff"
  },
  typography: {
    black: "#000",
    lightGray: "#6B7280",
    gray: "#9FA2B4",
    neutral: "#414141",
    red: "#FF0000",
    darkGray: "#757575",
    green: "#34D1BF",
    blue: "#178CD0",
    lightBlue: "#0F63FF14",
    darkBlue: "#0F63FF",
  },
});

export default extendTheme({
  colors
});