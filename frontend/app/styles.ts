import homeBgImg from "@/public/images/background.webp";
import { styled } from "@mui/material";

export const IndexMain = styled("main")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 100vh;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${homeBgImg.src});
  background-size: cover;
`;
