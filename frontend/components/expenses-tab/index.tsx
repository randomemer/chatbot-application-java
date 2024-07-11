import ExpenseItem from "@/components/expense-item";
import TransactionMenu from "@/components/transaction-menu";
import { fetcher } from "@/lib/api";
import { Expense, User } from "@/lib/types";
import { List } from "@mui/material";
import { useRef, useState } from "react";
import useSWR from "swr";

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
