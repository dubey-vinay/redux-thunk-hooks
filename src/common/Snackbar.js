import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({open, severityType, alertMsg, handleClose}) {
    const classes = useStyles();

    const handleAlertClose = () => {
        handleClose(false);
    }
  
    return (
        <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={3000} onClose={() => handleAlertClose()}>
            <Alert onClose={() => handleAlertClose()} severity={severityType}>
            {alertMsg}
            </Alert>
        </Snackbar>
        </div>
    );
}
