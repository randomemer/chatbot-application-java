import { styled } from "@mui/material/styles";
import Link from "next/link";

export const Header = styled("header")`
  position: relative;
  width: 100%;
  padding: 0 30vh;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 auto;
  height: 4.5rem;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Logo = styled("span")`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.palette.primary.main};
`;
