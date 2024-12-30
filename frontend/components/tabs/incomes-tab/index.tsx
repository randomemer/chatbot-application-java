import AlertModal from "@/components/dialogs/alert";
import IncomeDialog from "@/components/dialogs/income-dialog";
import TransactionItem from "@/components/transaction-item";
import TransactionMenu from "@/components/transaction-menu";
import api, { fetcher } from "@/lib/api";
import { Income, User } from "@/lib/types";
import { List } from "@mui/material";
import dayjs from "dayjs";
import { useModal } from "mui-modal-provider";
import { useRef, useState } from "react";
import useSWR from "swr";

interface IncomesTabProps {
  user?: Optional<User>;
}

export default function IncomesTab(props: IncomesTabProps) {
  const { data: incomes } = useSWR<Income[]>(`/incomes`, {
    fetcher,
    fallbackData: [],
  });

  const modal = useModal();

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setIndex] = useState<number | null>(null);
  const [editIncome, setEditIncome] = useState<Income | null>(null);

  const onOptionsClick = (index: number) => {
    setIndex(index);
    setMenuOpen(true);
  };

  const onDeleteClick = (index: number) => {
    const item = incomes![index];

    const alert = modal.showModal(AlertModal, {
      title: "Delete Income",
      description: `Are you sure you want to delete the income "${
        item.source
      }" (₹ ${item.amount.toLocaleString()}) on ${dayjs(item.date).format(
        "DD MMM, YYYY"
      )}?`,
      actions: [
        {
          label: "Cancel",
          handler: () => {
            alert.destroy();
          },
        },
        {
          label: "Delete",
          handler: async () => {
            await onDelete(index);
            alert.destroy();
          },
        },
      ],
    });
  };

  const onDelete = async (index: number) => {
    try {
      const item = incomes![index];
      await api.delete(`/incomes/${item.id}`);
    } catch (error) {
      console.error(error);
    }
  };

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
        onEdit={() => setEditIncome(incomes![selectedIndex!])}
        onDelete={() => onDeleteClick(selectedIndex!)}
      />

      <IncomeDialog
        isOpen={editIncome != null}
        income={editIncome}
        onClose={() => setEditIncome(null)}
      />
    </>
  );
}
