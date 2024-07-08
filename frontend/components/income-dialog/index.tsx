import { CustomDialogContent } from "@/components/expense-dialog/styles";
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
import { MouseEventHandler, useState } from "react";

interface IncomeDialogProps {
  isOpen?: Optional<boolean>;
  editIncome?: Optional<Income>;
  onClose: () => void;
}

export default function IncomeDialog(props: IncomeDialogProps) {
  const [isLoading, setLoading] = useState(false);

  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));

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

      const resp = await api.post("/incomes", data);
      console.log("Created Income", resp);

      onClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={!!props.isOpen} onClose={props.onClose}>
      <DialogTitle>
        {!props.editIncome ? "Create Income" : "Edit Income"}
      </DialogTitle>

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
          {!props.editIncome ? "Create" : "Save"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
