"use client";

import { Form, FormBtn, FormFields } from "@/app/auth/styles";
import api from "@/lib/api";
import { Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function onLogin() {
    setLoading(true);
    try {
      const body = { username: username.trim(), password };
      const resp = api.post("/auth/login", body);

      console.log("");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <Form>
      <Typography variant="h5">Login</Typography>

      <FormFields>
        <TextField
          label="Username"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormFields>

      <FormBtn variant="contained" loading={isLoading} onClick={onLogin}>
        Login
      </FormBtn>

      <Typography sx={{ alignSelf: "flex-end" }} variant="body2">
        Don't have an account?{" "}
        <Link replace component={NextLink} href="/auth/register">
          Sign up &rarr;
        </Link>
      </Typography>
    </Form>
  );
}
