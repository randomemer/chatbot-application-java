"use client";

import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import { BannerImage, FormContainer, Main } from "./styles";

export default function AuthLayout(props: PropsWithChildren) {
  return (
    <Main>
      <FormContainer>
        {props.children}
        <Box>
          <BannerImage src="/images/auth-banner.jpg" />
        </Box>
      </FormContainer>
    </Main>
  );
}
