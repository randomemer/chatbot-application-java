import { fetcher } from "@/lib/api";
import { Expense, User } from "@/lib/types";
import {
  CallMadeRounded,
  DeleteRounded,
  EditRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import useSWR from "swr";
import { AmountText, ListItemSecondary } from "./styles";

interface ExpensesTabProps {
  user?: Optional<User>;
}

export default function ExpensesTab(props: ExpensesTabProps) {
  const { data: expenses } = useSWR<Expense[]>(
    () => (props.user ? `/expenses/user/${props.user.id}` : null),
    fetcher
  );

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setIndex] = useState<number | null>(null);

  const onMenuClose = () => {
    setIndex(null);
    setMenuOpen(false);
  };

  const onOptionsClick = (index: number) => {
    setIndex(index);
    setMenuOpen(true);
  };

  console.log("expenses", expenses);

  return (
    <>
      <List>
        {expenses?.map((item, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <CallMadeRounded color="error" />
            </ListItemIcon>
            <ListItemText
              primary={item.description}
              secondary={dayjs(item.date).toDate().toLocaleDateString()}
            />
            <ListItemSecondary>
              <AmountText>₹ {item.amount.toLocaleString()}</AmountText>
              <IconButton
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onClick={() => onOptionsClick(i)}
              >
                <MoreVertRounded />
              </IconButton>
            </ListItemSecondary>
          </ListItem>
        ))}
      </List>

      <Menu
        open={isMenuOpen}
        anchorEl={
          selectedIndex != null ? itemRefs.current[selectedIndex] : null
        }
        onClose={onMenuClose}
      >
        <MenuItem
          onClick={() => {
            onMenuClose();
          }}
        >
          <ListItemIcon>
            <EditRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onMenuClose();
          }}
        >
          <ListItemIcon>
            <DeleteRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
