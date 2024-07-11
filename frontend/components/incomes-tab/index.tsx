import {
  AmountText,
  TransactionItemActions,
} from "@/components/expense-item/styles";
import { fetcher } from "@/lib/api";
import { Income, User } from "@/lib/types";
import { CallReceivedRounded, MoreVertRounded } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import useSWR from "swr";
import TransactionMenu from "../transaction-menu";

interface IncomesTabProps {
  user?: Optional<User>;
}

export default function IncomesTab(props: IncomesTabProps) {
  const { data: incomes } = useSWR<Income[]>(
    () => (!!props.user ? `/incomes/user/${props.user.id}` : null),
    {
      fetcher,
      fallbackData: [],
    }
  );

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setIndex] = useState<number | null>(null);

  const onOptionsClick = (index: number) => {
    setIndex(index);
    setMenuOpen(true);
  };

  console.log("incomes", incomes);

  return (
    <>
      <List>
        {incomes?.map((item, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <CallReceivedRounded color="success" />
            </ListItemIcon>
            <ListItemText
              primary={item.source}
              secondary={dayjs(item.date).toDate().toLocaleDateString()}
            />
            <TransactionItemActions>
              <AmountText>₹ {item.amount.toLocaleString()}</AmountText>
              <IconButton
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onClick={() => onOptionsClick(i)}
              >
                <MoreVertRounded />
              </IconButton>
            </TransactionItemActions>
          </ListItem>
        ))}
      </List>

      <TransactionMenu
        isOpen={isMenuOpen}
        anchorEl={
          selectedIndex != null ? itemRefs.current[selectedIndex] : null
        }
        onClose={() => setMenuOpen(false)}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </>
  );
}
