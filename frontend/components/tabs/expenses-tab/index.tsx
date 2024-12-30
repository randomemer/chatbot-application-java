import AlertModal from "@/components/dialogs/alert";
import ExpenseDialog from "@/components/dialogs/expense-dialog";
import TransactionItem from "@/components/transaction-item";
import TransactionMenu from "@/components/transaction-menu";
import api, { fetcher } from "@/lib/api";
import { Expense, User } from "@/lib/types";
import { List } from "@mui/material";
import dayjs from "dayjs";
import { useModal } from "mui-modal-provider";
import { useRef, useState } from "react";
import useSWR from "swr";

interface ExpensesTabProps {
  user?: Optional<User>;
}

export default function ExpensesTab(props: ExpensesTabProps) {
  const { data: expenses } = useSWR<Expense[]>(`/expenses`, fetcher);

  const modal = useModal();

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setIndex] = useState<number | null>(null);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);

  const onOptionsClick = (index: number) => {
    setIndex(index);
    setMenuOpen(true);
  };

  const onDeleteClick = (index: number) => {
    const item = expenses![index];

    const alert = modal.showModal(AlertModal, {
      title: "Delete Expense",
      description: `Are you sure you want to delete the expense "${
        item.description
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
      const item = expenses![index];
      await api.delete(`/expenses/${item.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <List>
        {expenses?.map((item, i) => (
          <TransactionItem
            key={i}
            type="expense"
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
        onEdit={() => setEditExpense(expenses![selectedIndex!])}
        onDelete={() => onDeleteClick(selectedIndex!)}
      />

      <ExpenseDialog
        isOpen={editExpense != null}
        expense={editExpense}
        onClose={() => setEditExpense(null)}
      />
    </>
  );
}
