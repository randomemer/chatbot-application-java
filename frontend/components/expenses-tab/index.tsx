import { fetcher } from "@/lib/api";
import { Expense, User } from "@/lib/types";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import {
  List,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import useSWR from "swr";
import ExpenseItem from "../expense-item";

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
          <ExpenseItem
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            expense={item}
            onOptionsClick={() => onOptionsClick(i)}
          />
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
