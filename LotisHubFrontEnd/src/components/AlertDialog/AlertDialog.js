import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = props =>  {
  
  const { title, children, open, setOpen, onConfirm, Agree, Disagree } = props;
  

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {Disagree}
          </Button>
          <Button onClick={() => {
              setOpen(false);
              onConfirm();
              }} 
              color="primary" autoFocus>
            {Agree}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default AlertDialog;