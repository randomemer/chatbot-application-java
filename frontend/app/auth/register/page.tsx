"use client";

import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {
  BannerImage,
  Form,
  FormContainer,
  FormFields,
  Main,
  RegisterBtn,
} from "./styles";

export default function RegisterRoute() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onRegister() {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Main>
      <FormContainer>
        <Form>
          <Typography variant="h5">Start Today</Typography>

          <FormFields>
            <TextField
              label="Username"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormFields>

          <RegisterBtn variant="contained" onClick={onRegister}>
            Submit
          </RegisterBtn>
        </Form>
        <Box>
          <BannerImage src="/images/auth-banner.jpg" />
        </Box>
      </FormContainer>
    </Main>
  );
}
