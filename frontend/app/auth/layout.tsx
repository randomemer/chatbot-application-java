"use client";

import authBannerImg from "@/public/images/auth-banner.jpg";
import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import { BannerImage, FormContainer, Main } from "./styles";

export default function AuthLayout(props: PropsWithChildren) {
  return (
    <Main>
      <FormContainer>
        {props.children}
        <Box>
          <BannerImage
            src={authBannerImg}
            alt="Calculator"
            width={432}
            height={648}
          />
        </Box>
      </FormContainer>
    </Main>
  );
}
