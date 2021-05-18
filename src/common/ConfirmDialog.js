import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmDialog({isOpen, msg, title, hideShowConfirmDialog}) {

  const handleClose = (isConfirm) => {
    hideShowConfirmDialog(false, isConfirm)
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
