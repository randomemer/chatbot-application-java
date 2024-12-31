import { Expense, Income } from "@/lib/types";
import {
  CallMadeRounded,
  CallReceivedRounded,
  CategoryRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import { IconButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import dayjs from "dayjs";
import { forwardRef } from "react";
import {
  AmountColumn,
  AmountText,
  DateText,
  TChip,
  TransactionItemActions,
  TransactionItemRoot,
} from "./styles";

interface ExpenseItemProps {
  type: "expense";
  transaction: Expense;
  onOptionsClick: () => void;
}

interface IncomeItemProps {
  type: "income";
  transaction: Income;
  onOptionsClick: () => void;
}

type TransactionItemProps = ExpenseItemProps | IncomeItemProps;

const TransactionItem = forwardRef<HTMLButtonElement, TransactionItemProps>(
  function (props, ref) {
    const { amount, date } = props.transaction;
    const desc =
      props.type === "expense"
        ? props.transaction.description
        : props.transaction.source;

    const category =
      (props.type === "expense" && props.transaction.category) || null;

    return (
      <TransactionItemRoot>
        <ListItemIcon>
          {props.type === "expense" ? (
            <CallMadeRounded color="error" />
          ) : (
            <CallReceivedRounded color="success" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={desc}
          secondary={
            <Stack direction="row" spacing="6px" marginTop="3px">
              {category ? (
                <TChip
                  color="secondary"
                  size="small"
                  icon={<CategoryRounded fontSize="small" />}
                  label={category.name}
                />
              ) : (
                <TChip size="small" sx={{ visibility: "hidden" }} />
              )}
            </Stack>
          }
          secondaryTypographyProps={{ component: "div" }}
        />
        <TransactionItemActions>
          <AmountColumn>
            <AmountText>₹ {amount.toLocaleString()}</AmountText>
            <DateText>{dayjs(date).format("DD MMM, YYYY")}</DateText>
          </AmountColumn>
          <IconButton ref={ref} onClick={() => props.onOptionsClick()}>
            <MoreVertRounded />
          </IconButton>
        </TransactionItemActions>
      </TransactionItemRoot>
    );
  }
);

export default TransactionItem;
