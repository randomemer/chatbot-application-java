import { Expense } from "@/lib/types";
import {
  CalendarTodayRounded,
  CallMadeRounded,
  CategoryRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { forwardRef } from "react";
import { AmountText, TChip, TransactionItemActions } from "./styles";

interface ExpenseItemProps {
  expense: Expense;
  onOptionsClick: () => void;
}

const ExpenseItem = forwardRef<HTMLButtonElement, ExpenseItemProps>(function (
  props,
  ref
) {
  const { expense } = props;

  return (
    <ListItem>
      <ListItemIcon>
        <CallMadeRounded color="error" />
      </ListItemIcon>
      <ListItemText
        primary={expense.description}
        secondary={
          <Stack direction="row" spacing="6px" marginTop="3px">
            <TChip
              color="primary"
              size="small"
              icon={<CalendarTodayRounded fontSize="small" />}
              label={dayjs(expense.date).toDate().toLocaleDateString()}
            />
            {expense.category && (
              <TChip
                color="secondary"
                size="small"
                icon={<CategoryRounded fontSize="small" />}
                label={expense.category.name}
              />
            )}
          </Stack>
        }
      />
      <TransactionItemActions>
        <AmountText>₹ {expense.amount.toLocaleString()}</AmountText>
        <IconButton ref={ref} onClick={() => props.onOptionsClick()}>
          <MoreVertRounded />
        </IconButton>
      </TransactionItemActions>
    </ListItem>
  );
});

export default ExpenseItem;
