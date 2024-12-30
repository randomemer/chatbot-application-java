import CircularProgressWithLabel from "@/components/circular-progress-with-label";
import {
  AmountColumn,
  AmountText,
  TransactionItemActions,
} from "@/components/transaction-item/styles";
import { BudgetSummary } from "@/lib/types";
import { MoreVertRounded } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface BudgetItemProps {
  budget: BudgetSummary;
  onOptionsClick: () => void;
}

export default function BudgetItem(props: BudgetItemProps) {
  const { budget } = props;
  const percent_spent = (budget.total_expenses / budget.budget_limit) * 100;

  return (
    <ListItem>
      <ListItemIcon>
        <CircularProgressWithLabel
          variant="determinate"
          value={percent_spent}
        />
      </ListItemIcon>
      <ListItemText primary={budget.expense_category.name} />

      <TransactionItemActions>
        <AmountColumn>
          <AmountText>
            ₹ {budget.total_expenses.toLocaleString()} / ₹{" "}
            {budget.budget_limit.toLocaleString()}
          </AmountText>
        </AmountColumn>
        <IconButton onClick={() => props.onOptionsClick()}>
          <MoreVertRounded />
        </IconButton>
      </TransactionItemActions>
    </ListItem>
  );
}
