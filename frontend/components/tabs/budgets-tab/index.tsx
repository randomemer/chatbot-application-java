import BudgetItem from "@/components/budget-item";
import AlertModal from "@/components/dialogs/alert";
import BudgetDialog from "@/components/dialogs/budget-dialog";
import TransactionMenu from "@/components/transaction-menu";
import api, { fetcher } from "@/lib/api";
import { BudgetSummary, User } from "@/lib/types";
import { List } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { useRef, useState } from "react";
import useSWR from "swr";

interface BudgetsTabProps {
  user?: Optional<User>;
}

export default function BudgetsTab(props: BudgetsTabProps) {
  const now = new Date();
  const query = new URLSearchParams({
    month: String(now.getMonth() + 1),
    year: String(now.getFullYear()),
  });
  const { data: budgets } = useSWR<BudgetSummary[]>(
    `/budgets/summary?${query}`,
    fetcher
  );

  const modal = useModal();

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setIndex] = useState<number | null>(null);
  const [editBudget, setEditBudget] = useState<BudgetSummary | null>(null);

  const onOptionsClick = (index: number) => {
    setIndex(index);
    setMenuOpen(true);
  };

  const onDeleteClick = (index: number) => {
    const item = budgets![index];

    const alert = modal.showModal(AlertModal, {
      title: "Delete Expense",
      description: `Are you sure you want to delete the budget for "${item.expense_category.name}" category?`,
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
      const item = budgets![index];
      await api.delete(`/budgets/${item.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <List>
        {budgets?.map((budget, i) => (
          <BudgetItem
            key={budget.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            budget={budget}
            onOptionsClick={() => onOptionsClick(i)}
          />
        ))}
      </List>

      <TransactionMenu
        isOpen={isMenuOpen}
        anchorEl={
          selectedIndex != null ? itemRefs.current[selectedIndex] : null
        }
        onEdit={() => setEditBudget(budgets![selectedIndex!])}
        onDelete={() => onDeleteClick(selectedIndex!)}
        onClose={() => setMenuOpen(false)}
      />

      <BudgetDialog
        isOpen={editBudget != null}
        budget={editBudget}
        onClose={() => setEditBudget(null)}
      />
    </>
  );
}
