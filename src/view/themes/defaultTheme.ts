import { createTheme } from "@material-ui/core/styles";

export const defaultTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        color: "#070574",
        backgroundColor: "#fff",
        fontSize: "2rem",
        fontWeight: "bold",
        margin: "1rem 2rem 2rem 2rem",
        width: "10rem",
      },
      outlined: {
        "&:hover": {
          backgroundColor: "#D3D3D3",
        },
      },
    },
  },
});
