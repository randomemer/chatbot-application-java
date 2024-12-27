import createTheme from "@mui/material/styles/createTheme";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const theme = createTheme({
  palette: {},
  typography: { fontFamily: "inherit", fontWeightRegular: 500 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-family: ${inter.style.fontFamily}, sans-serif;
          line-height: 1;
        }

        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
        }
      `,
    },
  },
});
