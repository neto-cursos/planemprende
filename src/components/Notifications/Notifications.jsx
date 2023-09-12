import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notifications = ({ msgNotif = "hola", showNotif, setShowNotif, severity, vertical = 'bottom', horizontal = 'center' }) => {
    const [stateNotif, setStateNotif] = React.useState({
        open: true,
        vertical: vertical,
        horizontal: horizontal,
    }
    );

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStateNotif({ ...stateNotif, open: false });
        setShowNotif(false);
    };
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {/* <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button> */}
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={stateNotif.open}
                autoHideDuration={3000} onClose={handleClose}
                key={vertical + horizontal}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {`${msgNotif}`}
                </Alert>

            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}

        </Stack>
    );
}

export default Notifications;