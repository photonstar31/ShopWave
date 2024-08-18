import React from "react";
import styles from "../../../styles/Modal.module.css";
import { Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  btnEffect: {
    "&:hover": {
      boxShadow: "1px 5px 5px rgba(0,0,0,.12)",
    },
    "&:active": {
      boxShadow: "none",
    },
  },
  btnText: {
    textTransform: "capitalize",
  },
  modalMessage: {
    fontSize: 30,
    fontWeight: 500,
    fontFamily: "Josefin Sans",
    textTransform: "capitalize",
  },
});

const Modal: React.FC<{
  message: string;
  btnOkText: string;
  btnCancelText: string;
  proceedHandler: () => void;
  cancelHandler: () => void;
}> = ({ message, btnOkText, btnCancelText, proceedHandler, cancelHandler }) => {
  const classes = useStyles();

  return (
    <div className={styles.modal}>
      <div className={styles.modalInnerContainer}>
        <Typography variant="h5" className={classes.modalMessage}>
          {message}
        </Typography>
        <div className={styles.btnContainer}>
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            className={classes.btnEffect}
            onClick={cancelHandler}
          >
            <Typography className={classes.btnText} variant="subtitle2">
              {btnCancelText}
            </Typography>
          </Button>

          <Button
            variant="contained"
            disableElevation
            color="secondary"
            className={classes.btnEffect}
            onClick={proceedHandler}
          >
            <Typography className={classes.btnText} variant="subtitle2">
              {btnOkText}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
