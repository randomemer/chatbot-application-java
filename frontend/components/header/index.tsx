import { useUser } from "@/components/providers/user";
import { Logout } from "@mui/icons-material";
import { IconButton, ListItemIcon, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { AccountMenu, Header, Logo, LogoWrapper, MenuAvatar } from "./styles";

export default function AppHeader() {
  const { user, logout } = useUser();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  return (
    <Header>
      <LogoWrapper href="/">
        <Logo>WealthWise</Logo>
      </LogoWrapper>

      <IconButton size="small" onClick={() => setMenuOpen(!isMenuOpen)}>
        <MenuAvatar
          ref={avatarRef}
          {...(!!user && stringAvatar(user.username))}
        />
      </IconButton>

      <AccountMenu
        anchorEl={avatarRef.current}
        open={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        onClick={() => setMenuOpen(false)}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </AccountMenu>
    </Header>
  );
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0].toUpperCase()}`,
  };
}
