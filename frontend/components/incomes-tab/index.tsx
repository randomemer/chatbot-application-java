import TransactionItem from "@/components/transaction-item";
import TransactionMenu from "@/components/transaction-menu";
import { fetcher } from "@/lib/api";
import { Income, User } from "@/lib/types";
import { List } from "@mui/material";
import { useRef, useState } from "react";
import useSWR from "swr";

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
          <TransactionItem
            key={i}
            type="income"
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            transaction={item}
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
