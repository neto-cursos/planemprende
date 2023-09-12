import React from 'react'
import {
    Dialog, DialogTitle,
    DialogContent, DialogActions,
    Typography, IconButton
} from '@mui/material'
import { styled } from '@mui/material/styles';
import Controls from "../Mui";
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

const DialogM = styled(Dialog)(({theme}) => ({
    padding:theme.spacing(2),
    position: 'absolute',
    
}))
const DialogTitleM = styled(DialogTitle)(({theme}) => ({
    textAlign: 'center'
}))
const DialogContentM = styled(DialogContent)(({theme}) => ({
    textAlign: 'center'
}))
const DialogActionsM = styled(DialogActions)(({theme}) => ({
    justifyContent: 'center'
}))

    const IconButtonM= styled(IconButton)(({theme}) => ({
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
    '&:hover': {
        backgroundColor: theme.palette.error.light,
        cursor: 'default'
    },
    '& .MuiSvgIcon-root': {
        fontSize: '4rem',
    }
}))


export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;


    return (
        <DialogM open={confirmDialog.isOpen}>
            <DialogTitleM>
                <IconButtonM disableRipple>
                    <NotListedLocationIcon />
                </IconButtonM>
            </DialogTitleM>
            <DialogContentM>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContentM>
            <DialogActionsM>
                <Controls.Button
                    text="No"
                    color="primary"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Controls.Button
                    text="Sí"
                    color="warning"
                    onClick={confirmDialog.onConfirm} />
            </DialogActionsM>
        </DialogM>
    )
}


// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function AlertDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       {/* <Button variant="outlined" onClick={handleClickOpen}>
//         Open alert dialog
//       </Button> */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Use Google's location service?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending anonymous
//             location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleClose} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
