import { createTheme } from "@mui/material";

const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#002947",
      light: "white",
    },
    secondary: {
      main: "#262435",
    },
  },
  MuiTab: {
    root: {},
    selected: {
      backgroundColor: "#f5f5f5",
    },
  },
});

export default CustomTheme;
