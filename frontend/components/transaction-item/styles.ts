import { Chip, ListItem, ListItemSecondaryAction } from "@mui/material";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";

export const TransactionItemRoot = styled(ListItem)`
  .${svgIconClasses.root} {
    border-radius: 50%;
  }
`;

export const TransactionItemActions = styled(ListItemSecondaryAction)`
  display: flex;
  gap: 1rem;
`;

export const AmountColumn = styled("div")`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const AmountText = styled("span")`
  font-weight: 600;
  font-size: 1.5rem;
`;

export const DateText = styled("span")`
  font-size: 0.825rem;
`;

export const TChip = styled(Chip)`
  padding: 0 3px;
`;
