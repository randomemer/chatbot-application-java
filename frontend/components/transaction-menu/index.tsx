import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

interface TransactionMenuProps {
  isOpen?: Optional<boolean>;
  anchorEl?: Optional<Element>;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TransactionMenu(props: TransactionMenuProps) {
  return (
    <Menu
      open={!!props.isOpen}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
    >
      <MenuItem
        dense
        onClick={() => {
          props.onEdit();
          props.onClose();
        }}
      >
        <ListItemIcon>
          <EditRounded fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <MenuItem
        dense
        onClick={() => {
          props.onDelete();
          props.onClose();
        }}
      >
        <ListItemIcon>
          <DeleteRounded fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
}
