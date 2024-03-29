import * as React from "react"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        button:{
            backgroundColor: "deepblue"
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            borderRadius: 8,
            //border: '2px solid #000',
            boxShadow: theme.shadows[5],
            backdropFilter: "blur(3px)",
            width: 600,
            height: 382

            //padding: theme.spacing(2, 4, 3),
        },
    }),
);

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="secondary" className={classes.button} onClick={handleOpen}>
        react-transition-group
        </Button>
        <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
        timeout: 500,
    }}
>
    <Fade in={open}>
    <div className={classes.paper}>
    <h2 id="transition-modal-title">Transition modal</h2>
    <p id="transition-modal-description">react-transition-group animates me.</p>
    </div>
    </Fade>
    </Modal>
    </div>
);
}