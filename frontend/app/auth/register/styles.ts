import { Button, Card } from "@mui/material";
import styled from "@mui/material/styles/styled";

export const Main = styled("main")`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled(Card)`
  display: flex;
  width: 54rem;
  height: 27rem;

  & > * {
    flex: 1;
  }
`;

export const BannerImage = styled("img")`
  width: 100%;
  object-fit: cover;
`;

export const FormFields = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Form = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
`;

export const RegisterBtn = styled(Button)`
  align-self: flex-end;
`;
