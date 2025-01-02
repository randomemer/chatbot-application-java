"use client";

import { theme } from "@/lib/theme";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ModalProvider from "mui-modal-provider";
import { PropsWithChildren } from "react";
import UserProvider from "./user";

export default function GlobalProvider(props: PropsWithChildren) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {props.children}
          </LocalizationProvider>
        </ModalProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
