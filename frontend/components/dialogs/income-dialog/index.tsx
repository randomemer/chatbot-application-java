import { CustomDialogContent } from "@/components/dialogs/expense-dialog/styles";
import api from "@/lib/api";
import { Income, IncomeInput } from "@/lib/types";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MouseEventHandler, useEffect, useState } from "react";

interface IncomeDialogCreateProps {
  isOpen?: Optional<boolean>;
  onClose: () => void;
}

interface IncomeDialogEditProps extends IncomeDialogCreateProps {
  income: Income | null;
}

export default function IncomeDialog(
  props: IncomeDialogCreateProps | IncomeDialogEditProps
) {
  const isEdit = "income" in props;

  const [isLoading, setLoading] = useState(false);

  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));

  useEffect(() => {
    if ("income" in props && !!props.income) {
      const income = (props as IncomeDialogEditProps).income!;
      setAmount(income.amount.toString());
      setSource(income.source);
      setDate(dayjs(income.date));
    }
  }, [props]);

  const resetState = () => {
    setAmount("");
    setSource("");
    setDate(dayjs(new Date()));
  };

  const onClose = () => {
    props.onClose();
    resetState();
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data: IncomeInput = {
        amount: Number(amount),
        date: date.toISOString().split("T")[0],
        source: source,
      };

      if (!isEdit) {
        const resp = await api.post("/incomes", data);
        console.log("Created Income", resp);
      } else {
        const resp = await api.put(`/incomes/${props.income!.id}`, data);
        console.log("Updated Income", resp);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={!!props.isOpen} onClose={props.onClose}>
      <DialogTitle>{!isEdit ? "Create Income" : "Edit Income"}</DialogTitle>

      <CustomDialogContent className="gap-4">
        <TextField
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          label="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

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
