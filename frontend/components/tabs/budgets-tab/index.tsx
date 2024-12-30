import BudgetItem from "@/components/budget-item";
import { fetcher } from "@/lib/api";
import { BudgetSummary, User } from "@/lib/types";
import { List } from "@mui/material";
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

  return (
    <>
      <List>
        {budgets?.map((budget) => (
          <BudgetItem
            key={budget.id}
            budget={budget}
            onOptionsClick={() => {}}
          />
        ))}
      </List>
    </>
  );
}
