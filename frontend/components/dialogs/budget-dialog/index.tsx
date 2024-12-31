import { CustomDialogContent } from "@/components/dialogs/expense-dialog/styles";
import api, { fetcher } from "@/lib/api";
import { BudgetSummary, ExpenseCategory } from "@/lib/types";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface BudgetDialogCreateProps {
  isOpen?: Optional<boolean>;
  onClose: () => void;
}

interface BudgetDialogEditProps extends BudgetDialogCreateProps {
  budget: BudgetSummary | null;
}

export default function BudgetDialog(
  props: BudgetDialogCreateProps | BudgetDialogEditProps
) {
  const isEdit = "budget" in props;

  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(-1);

  const { data: categories } = useSWR<ExpenseCategory[]>(
    "/expense-categories",
    {
      fallbackData: [],
      fetcher: fetcher,
    }
  );

  useEffect(() => {
    if ("budget" in props && !!props.budget) {
      const budget = (props as BudgetDialogEditProps).budget!;
      setAmount(budget.budget_limit.toString());
      setCategory(budget.expense_category.id ?? -1);
    }
  }, [props]);

  const resetState = () => {
    setAmount("");
    setCategory(-1);
  };

  const onClose = () => {
    props.onClose();
    resetState();
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        amount: Number(amount),
        category_id: category,
      };

      if (!isEdit) {
        const resp = await api.post("/budgets", data);
        console.log("Created budget", resp.data);
      } else {
        const resp = await api.put(`/budgets/${props.budget?.id}`, data);
        console.log("Updated budget", resp.data);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={!!props.isOpen}
      onClose={onClose}
      PaperProps={{ component: "form" }}
    >
      <DialogTitle>{isEdit ? "Edit Budget" : "Create Budget"}</DialogTitle>

      <CustomDialogContent className="gap-4">
        <TextField
          type="number"
          label="Budget Limit"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <FormControl>
          <InputLabel id="expense-category-id">Category</InputLabel>
          <Select
            label="Category"
            id="expense-category-select"
            labelId="expense-category-id"
            value={category}
            onChange={(e) => setCategory(e.target.value as number)}
          >
            {categories?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CustomDialogContent>

      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton
          loading={isLoading}
          variant="text"
          color="primary"
          onClick={(e) => onSubmit(e)}
        >
          {!isEdit ? "Create" : "Save"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
