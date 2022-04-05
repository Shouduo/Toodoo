import * as React from 'react';
import { IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: React.ReactElement;
}

//
const Modal = ({ open, handleClose, title, content }: Props) => {
  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          size="small"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: '14px',
            top: '14px',
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default Modal;
