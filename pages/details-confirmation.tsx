import React, { useEffect, useState } from "react";
import styles from "../styles/DetailsConfirmation.module.css";
import Header from "../components/partials/Header/Header";
import { Typography, TextField, makeStyles, Button } from "@material-ui/core";
import taskbook from "../assets/img/taskbook.png";
import Image from "next/image";
import Divider from "../components/partials/Divider/Divider";
import { useAppContext } from "../store/context/appContext";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
const db = getFirestore();

const useStyles = makeStyles({
  color1D3178: {
    color: "#1D3178",
  },
  heading: {
    fontWeight: 700,
    marginBottom: 44,
  },
  confirmDetailsHeading: {
    fontSize: 24,
    fontFamily: "lato",
    fontWeight: 700,
    marginBottom: 20,
  },
  btn: {
    borderRadius: 2,
    width: 182,
    height: 44,
    marginTop: 88,
    textTransform: "capitalize",
    "&:hover": {
      boxShadow: "1px 5px 5px rgba(0,0,0,.12)",
    },
    "&:active": {
      boxShadow: "none",
    },
  },
  btnText: {
    fontSize: 16,
  },
  textField: {
    width: 336,
    "& > label": {
      color: "#C1C8E1",
      fontWeight: 300,
      fontSize: 14,
      textTransform: "capitalize",
    },
    "& > div": {
      fontWeight: 400,
      fontSize: 16,
      color: "#373737",
      fontFamily: "'Josefin Sans'",
    },
  },
});

const DetailsConfirmation = () => {
  const classes = useStyles();
  const router = useRouter();
  const { userInfo } = useAppContext();
  const [userName, setuserName] = useState("");
  const [userPhone, setuserPhone] = useState("");
  const [userPincode, setuserPincode] = useState("");
  const [userAddress, setuserAddress] = useState("");

  /**
   * fetching user data
   */
  useEffect(() => {
    if (!userInfo) {
      return;
    }
    const getUserData = async () => {
      const docRef = doc(db, "users", userInfo && userInfo.docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();

        setuserName(data.name);
        setuserAddress(data.address && data.address);
        setuserPhone(data.phone && data.phone);
        setuserPincode(data.pincode && data.pincode);
      } else {
        setuserName("");
        setuserAddress("");
        setuserPincode("");
        setuserPhone("");
      }
    };
    getUserData();
  }, [userInfo]);

  /**
   * form submit handler
   */
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace("/order-confirmed");
  };

  return (
    <React.Fragment>
      <Header heading="details confirmation" path="Details-Confirmation" />
      <section className={styles.DetailsConfirmation}>
        <div className={styles.innerContainer}>
          <Typography
            variant="h6"
            className={`${classes.confirmDetailsHeading} ${classes.color1D3178}`}
          >
            Confirm Your Details
          </Typography>
          <form className={styles.form} onSubmit={formSubmitHandler}>
            <div className={styles.contactInfo}>
              <Typography
                variant="body1"
                className={`${classes.heading} ${classes.color1D3178}`}
              >
                Contact Information
              </Typography>

              <TextField
                type="number"
                className={classes.textField}
                label="phone number"
                focused={userPhone ? true : false}
                value={userPhone && userPhone}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 12);
                  setuserPhone(value);
                }}
                variant="standard"
                required
              />
              <TextField
                type="number"
                className={classes.textField}
                label="alternative phone number (optional)"
                variant="standard"
              />
            </div>
            <div className={styles.shippingAddress}>
              <Typography
                variant="body1"
                className={`${classes.heading} ${classes.color1D3178}`}
              >
                Shipping Address
              </Typography>
              <TextField
                className={classes.textField}
                label="name"
                focused={userName ? true : false}
                value={userName && userName}
                variant="standard"
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
                required
              />
              <TextField
                className={classes.textField}
                label="pincode"
                focused={userPincode ? true : false}
                value={userPincode && userPincode}
                variant="standard"
                onChange={(e) => {
                  setuserPincode(e.target.value);
                }}
                required
              />
              <TextField
                className={classes.textField}
                label="address"
                focused={userAddress ? true : false}
                value={userAddress && userAddress}
                variant="standard"
                onChange={(e) => {
                  setuserAddress(e.target.value);
                }}
                required
              />
              <TextField
                className={classes.textField}
                label="add nearby famous shop/mall/landmark (optional)"
                variant="standard"
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              className={classes.btn}
              disableElevation
              color="secondary"
            >
              <Typography variant="subtitle1" className={classes.btnText}>
                Place Order
              </Typography>
            </Button>

            <div className={styles.taskbookImg}>
              <Image src={taskbook} alt="taskbook-img" />
            </div>
          </form>
        </div>
      </section>

      <Divider />
    </React.Fragment>
  );
};

export default DetailsConfirmation;
