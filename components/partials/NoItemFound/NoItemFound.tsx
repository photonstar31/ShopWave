import React from "react";
import Image from "next/image";
import styles from "../../../styles/NoItemFound.module.css";
import noItemFoundImg from "../../../assets/img/noitem.png";
import { Typography, makeStyles, Button } from "@material-ui/core";
import NextLink from "next/link";

const useStyles = makeStyles({
  noCartFoundHeading: {
    fontSize: 24,
    fontWeight: 400,
    textTransform: "capitalize",
  },
  noCartmessage: {
    fontSize: 13,
    textTransform: "none",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  noCartBtn: {
    width: 200,
    height: 40,
    borderRadius: 2,
    "&:hover": {
      boxShadow: "1px 5px 5px rgba(0,0,0,.12)",
    },
    "&:active": {
      boxShadow: "none",
    },
  },
  noCartBtnText: {
    textTransform: "capitalize",
  },
});

const NoItemFound: React.FC<{
  text: string;
  message: string;
  btnText: string;
  btnLink: string;
}> = ({ text, btnText, message, btnLink }) => {
  const classes = useStyles();
  return (
    <div className={styles.noCartFound}>
      <div className={styles.noCartFoundImg}>
        <Image src={noItemFoundImg} alt="no-cart-found" />
      </div>
      <Typography variant="h6" className={classes.noCartFoundHeading}>
        {text}
      </Typography>

      {message && (
        <Typography variant="overline" className={classes.noCartmessage}>
          {message}
        </Typography>
      )}

      {btnText && (
        <NextLink href={btnLink}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.noCartBtn}
            disableElevation
          >
            <Typography variant="caption" className={classes.noCartBtnText}>
              {btnText}
            </Typography>
          </Button>
        </NextLink>
      )}
    </div>
  );
};

export default NoItemFound;
