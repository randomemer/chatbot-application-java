import { Chip, ListItemSecondaryAction } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TransactionItemActions = styled(ListItemSecondaryAction)`
  display: flex;
  gap: 1rem;
`;

export const AmountText = styled("span")`
  font-weight: 600;
  font-size: 1.5rem;
  margin: auto 0;
`;

export const TChip = styled(Chip)`
  padding: 0 3px;
`;
