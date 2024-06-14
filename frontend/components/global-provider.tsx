"use client";

import { theme } from "@/lib/theme";
import { ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";

export default function GlobalProvider(props: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
