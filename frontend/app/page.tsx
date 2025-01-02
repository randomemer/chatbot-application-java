"use client";

import { ChevronRight, Savings as SavingsIcon } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { IndexMain } from "./styles";

export default function Home() {
  return (
    <IndexMain>
      <SavingsIcon color="primary" sx={{ fontSize: 72 }} />
      <Stack alignItems="center" color={"white"}>
        <Typography variant="h3">WealthWise</Typography>
        <Typography variant="h6">
          Master Your Money, Shape Your Future!
        </Typography>
      </Stack>
      <Button
        LinkComponent={Link}
        href="/auth/register"
        variant="contained"
        endIcon={<ChevronRight />}
      >
        Get Started
      </Button>
    </IndexMain>
  );
}
