import { Avatar, Menu } from "@mui/material";
import { listClasses } from "@mui/material/List";
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

export const MenuAvatar = styled(Avatar)`
  height: 2rem;
  width: 2rem;
`;

export const AccountMenu = styled(Menu)`
  margin-top: 14px;

  /* .${listClasses.root} {
    width: 250px;
  } */
`;
