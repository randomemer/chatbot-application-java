"use client";

import SavingsIcon from "@mui/icons-material/Savings";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IndexMain } from "./styles";

export default function Home() {
  return (
    <IndexMain>
      <SavingsIcon color="primary" sx={{ fontSize: 72 }} />
      <Stack alignItems="center">
        <Typography variant="h3">Your Personal Finance Manager</Typography>
        <Typography variant="body1">
          Master Your Money, Shape Your Future!
        </Typography>
      </Stack>
      <Button variant="contained">Get Started</Button>
    </IndexMain>
  );
}
