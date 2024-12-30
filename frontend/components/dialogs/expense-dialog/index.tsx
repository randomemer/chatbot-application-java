import api, { fetcher } from "@/lib/api";
import { Expense, ExpenseCategory, ExpenseInput } from "@/lib/types";
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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MouseEventHandler, useEffect, useState } from "react";
import useSWR from "swr";
import { CustomDialogContent } from "./styles";

interface ExpenseDialogCreateProps {
  isOpen?: Optional<boolean>;
  onClose: () => void;
}

interface ExpenseDialogEditProps extends ExpenseDialogCreateProps {
  expense: Expense | null;
}

export default function ExpenseDialog(
  props: ExpenseDialogCreateProps | ExpenseDialogEditProps
) {
  const isEdit = "expense" in props;

  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [category, setCategory] = useState(-1);

  useEffect(() => {
    if ("expense" in props && !!props.expense) {
      const expense = (props as ExpenseDialogEditProps).expense!;
      setAmount(expense.amount.toString());
      setDesc(expense.description);
      setDate(dayjs(expense.date));
      setCategory(expense.category.id ?? -1);
    }
  }, [props]);

  const { data: categories } = useSWR<ExpenseCategory[]>(
    "/expense-categories",
    {
      fallbackData: [],
      fetcher: fetcher,
    }
  );

  const resetState = () => {
    setAmount("");
    setDesc("");
    setDate(dayjs(new Date()));
    setCategory(-1);
  };

  const onClose = () => {
    props.onClose();
    resetState();
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data: ExpenseInput = {
        amount: Number(amount),
        date: date.toISOString().split("T")[0],
        description: desc,
        category_id: category !== -1 ? category : null,
      };

      if (!isEdit) {
        const resp = await api.post("/expenses", data);
        console.log(resp);
      } else {
        const resp = await api.put(`/expenses/${props.expense!.id}`, data);
        console.log(resp);
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
      <DialogTitle>{!isEdit ? "Create Expense" : "Edit Expense"}</DialogTitle>

      <CustomDialogContent className="gap-4">
        <TextField
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
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

        <DatePicker
          label="Date"
          value={date}
          onChange={(date) => date && setDate(date)}
        />
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
