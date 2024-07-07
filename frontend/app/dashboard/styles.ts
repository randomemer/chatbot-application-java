import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Main = styled("main")`
  max-width: 75rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Welcome = styled("h1")`
  font-size: 36px;
`;

export const SummaryContainer = styled("div")`
  display: flex;
`;

export const SummaryCard = styled(Card)`
  padding: 1rem;
  width: 15rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SummaryCardTitle = styled("h3")`
  font-size: 18px;
  font-weight: 600;
`;

export const SummaryNumber = styled("p")`
  align-self: flex-end;
  font-size: 24px;
`;
