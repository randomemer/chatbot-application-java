"use client";

import { theme } from "@/lib/theme";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PropsWithChildren } from "react";

export default function GlobalProvider(props: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {props.children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
