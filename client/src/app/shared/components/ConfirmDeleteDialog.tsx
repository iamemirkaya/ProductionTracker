import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Silme Onayı",
  message = "Bu işlemi yapmak istediğinizden emin misiniz?",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={onConfirm} color="error" variant="contained">Sil</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;