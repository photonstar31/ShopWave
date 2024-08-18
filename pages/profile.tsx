import React, { useEffect, useReducer, useRef, useState } from "react";
import Header from "../components/partials/Header/Header";
import styles from "../styles/Profile.module.css";
import { useAppContext } from "../store/context/appContext";
import { Edit } from "@mui/icons-material";
import NextLink from "next/link";

import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth, updatePassword } from "firebase/auth";
const auth = getAuth();
const db = getFirestore();

import {
  Typography,
  makeStyles,
  TextField,
  Card,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { FormControl } from "@mui/material";
import Loading from "../components/partials/Loading/Loading";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles({
  profileDataFieldKey: {
    width: 100,
    marginRight: 30,
    fontWeight: 500,
  },
  textField: {
    "& > *": {
      "&> *": {
        fontWeight: 300,
      },
    },
  },
  color151875: {
    color: "#151875",
  },
  color646262: {
    color: "#646262",
  },
  heading: {
    fontSize: 28,
    lineHeight: "32px",
    marginBottom: 10,
  },
  innerContainer: {
    maxWidth: 1100,
    borderRadius: 10,
    margin: "auto",
    padding: 40,
    display: "flex",
    justifyContent: "space-between",
  },

  changePasstextField: {
    width: "90%",
    "& > label": {
      fontWeight: 300,
      fontSize: 15,
    },
    "& > div input": {
      fontSize: 15,
    },
  },
  btn: {
    textTransform: "capitalize",
    "&:hover": {
      boxShadow: "1px 3px 5px rgba(0,0,0,.1)",
    },
    "&:active": {
      boxShadow: "none",
    },
  },
  editIcon: {
    fill: "#fff",
  },
  activeIcon: {
    boxShadow: "none",
    backgroundImage:
      "linear-gradient(to right bottom, #ebe2e6, #f8f1f4, #e2e2e2)",
    transition: "all .3s",
    "& > svg": {
      fill: "#000",
    },
    "&:hover": {
      boxShadow: "none",
    },
    "&:avtive": {
      boxShadow: "none",
    },
  },
  noPointerEvent: {
    pointerEvents: "none",
  },
  formControl: {
    width: "62%",
    "&>*": {
      fontSize: 15,
      fontWeight: 200,
      padding: "0px 5px",
    },
  },
  passwordMessage: {
    textTransform: "capitalize",
  },
  signoutBtn: {
    padding: "6px 30px",
    textTransform: "capitalize",
  },
  changePasswordBtn: {
    width: 144,
    height: 36,
    padding: 0,
  },
  changePasswordBtnText: {
    fontWeight: 600,
    fontFamily: "Josefin Sans",
  },
});

const userInfoReducerFn = (state, action) => {
  if (action.type === "replaceData") {
    return {
      name: action.data.name,
      email: action.data.email,
      pincode: action.data.pincode !== undefined ? action.data.pincode : "",
      address: action.data.address !== undefined ? action.data.address : "",
      phone: action.data.phone !== undefined ? action.data.phone : "",
      currency: action.data.currency,
    };
  }
  if (action.type === "name") {
    return { ...state, name: action.value };
  }
  if (action.type === "email") {
    return { ...state, email: action.value };
  }
  if (action.type === "pincode") {
    return { ...state, pincode: action.value };
  }
  if (action.type === "address") {
    return { ...state, address: action.value };
  }
  if (action.type === "phone") {
    return { ...state, phone: action.value };
  }
  if (action.type === "currency") {
    return { ...state, currency: action.value };
  }
};

const userInitialState = {
  name: "",
  email: "",
  pincode: "",
  address: "",
  phone: "",
  currency: "USD",
};

const arrayOfFields = [
  "name",
  "email",
  "pincode",
  "address",
  "phone",
  "currency",
];

export default function account() {
  const classes = useStyles();
  const router = useRouter();
  const { userInfo, setCurrencyType, currencyType, isUserLoggedIn } =
    useAppContext();
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const rePasswordInputRef = useRef<HTMLInputElement>(null);

  const [changeProfileInfo, setChangeProfileInfo] = useState(false);
  const [doesDataChanged, setdoesDataChanged] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [userInfoState, dispatchUserInfoStateFn] = useReducer(
    userInfoReducerFn,
    userInitialState
  );
  const [prevUserState, setPrevUserState] = useState(userInfoState);
  const [updatePasswordMessage, setUpdatePasswordMessage] = useState({
    state: "false",
    message: "",
  });

  /**
   * checking if the user is login, if not then sending the user on login page
   */
  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    dispatchUserInfoStateFn({ type: "currency", value: currencyType });
  }, [currencyType]);

  const userProfileInfoChangeHandler = (e) => {
    if (!changeProfileInfo) {
      return;
    }

    const key: string = e.target.id;
    const value: string = e.target.value;
    setdoesDataChanged(true);

    dispatchUserInfoStateFn({ type: key, value: value });
  };

  const userProfileInfoSaveHandler = () => {
    setChangeProfileInfo(false);

    const updateUserData = async () => {
      const userRef = doc(db, "users", userInfo.docId);
      await updateDoc(userRef, userInfoState);
    };
    updateUserData();

    setCurrencyType(userInfoState.currency);
  };

  const cancelChangeHandler = () => {
    setChangeProfileInfo(false);
    dispatchUserInfoStateFn({ type: "replaceData", data: prevUserState });
  };

  const passwordFormSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordValue = passwordInputRef.current?.value;
    const rePasswordValue = rePasswordInputRef.current?.value;
    if (passwordValue !== rePasswordValue) {
      setUpdatePasswordMessage({
        state: "error",
        message: "password did not match!",
      });
      return;
    }
    const changePassword = () => {
      setPasswordLoading(true);
      const user = auth.currentUser;

      updatePassword(user, passwordValue)
        .then(() => {
          passwordInputRef.current.value = "";
          rePasswordInputRef.current.value = "";
          setUpdatePasswordMessage({
            state: "success",
            message: "password successfully changed",
          });
          setPasswordLoading(false);
          // Update successful .
        })
        .catch((error) => {
          setUpdatePasswordMessage({
            state: "error",
            message:
              "something wrong please try again later, or login again and try.",
          });
          setPasswordLoading(false);
          console.log(error);
          // An error ocurred
          // ...
        });
    };

    changePassword();
  };

  const signoutHandler = () => {
    auth.signOut();
    window.location.pathname = "/";
  };

  useEffect(() => {
    const data = {
      name: userInfo && userInfo.userData.name,
      email: userInfo && userInfo.userData.email,
      pincode: userInfo && userInfo.userData.pincode,
      address: userInfo && userInfo.userData.address,
      phone: userInfo && userInfo.userData.phone,
      currency: userInfo && userInfo.userData.currency,
    };
    dispatchUserInfoStateFn({ type: "replaceData", data });
  }, [userInfo]);

  return (
    <React.Fragment>
      <Header heading="My Account" path="My Account" />
      <section className={styles.profile}>
        <Card className={classes.innerContainer}>
          <React.Fragment>
            <div className={styles.userProfileInfo}>
              <Typography
                variant="h6"
                className={`${classes.heading} ${classes.color151875}`}
              >
                Profile
              </Typography>
              <div className={`${styles.box} ${styles.userInfoContainer}`}>
                {!changeProfileInfo && (
                  <span
                    className={`${styles.editIcon} ${
                      changeProfileInfo ? classes.activeIcon : ""
                    }`}
                    onClick={() => {
                      setChangeProfileInfo(true);
                      setPrevUserState(userInfoState);
                    }}
                  >
                    <Edit className={classes.editIcon} />
                  </span>
                )}

                {/* text fields */}
                {arrayOfFields.map((field) => {
                  return field === "currency" ? (
                    <div key={field} className={styles.profileDataField}>
                      <Typography
                        className={classes.profileDataFieldKey}
                        variant="body1"
                      >
                        {field} :
                      </Typography>
                      {userInfo ? (
                        <FormControl className={classes.formControl}>
                          <Select
                            disabled={!changeProfileInfo}
                            value={userInfoState && userInfoState.currency}
                            onChange={(e) => {
                              dispatchUserInfoStateFn({
                                type: "currency",
                                value: e.target.value,
                              });
                              setdoesDataChanged(true);
                            }}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            {userInfoState.currency === "usd" ? (
                              <MenuItem
                                value={userInfoState && userInfoState.currency}
                              >
                                USD
                              </MenuItem>
                            ) : (
                              <MenuItem value="usd">USD</MenuItem>
                            )}
                            <MenuItem value="inr">INR</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        <Loading width={20} color="#d6d6d6" />
                      )}
                    </div>
                  ) : (
                    <div key={field} className={styles.profileDataField}>
                      <Typography
                        className={classes.profileDataFieldKey}
                        variant="body1"
                      >
                        {field} :
                      </Typography>

                      {userInfo ? (
                        <TextField
                          id={field}
                          type="text"
                          className={`${classes.textField} ${
                            !changeProfileInfo ? classes.noPointerEvent : ""
                          }`}
                          value={userInfoState[field]}
                          variant="outlined"
                          size="small"
                          onChange={userProfileInfoChangeHandler}
                          disabled={
                            field === "email" ? true : !changeProfileInfo
                          }
                        />
                      ) : (
                        <Loading width={20} color="#d6d6d6" />
                      )}
                    </div>
                  );
                })}

                {changeProfileInfo && (
                  <div className={styles.userProfileInfoBtn}>
                    <Button
                      variant="contained"
                      disableElevation
                      className={classes.btn}
                      color="secondary"
                      disabled={!doesDataChanged}
                      onClick={userProfileInfoSaveHandler}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="contained"
                      disableElevation
                      className={classes.btn}
                      color="secondary"
                      onClick={cancelChangeHandler}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.userOptionsContainer}>
              <div className={styles.changePasswordContainer}>
                <Typography
                  variant="h6"
                  className={`${classes.heading} ${classes.color151875}`}
                >
                  Change Password
                </Typography>
                <div className={styles.box}>
                  <form
                    className={styles.changePasswordForm}
                    onSubmit={passwordFormSubmitHandler}
                  >
                    <TextField
                      type="password"
                      variant="outlined"
                      inputRef={passwordInputRef}
                      className={classes.changePasstextField}
                      label="New Password"
                      required
                      size="small"
                      disabled={passwordLoading}
                    />
                    <TextField
                      type="password"
                      variant="outlined"
                      inputRef={rePasswordInputRef}
                      className={classes.changePasstextField}
                      label="Confirm Password"
                      required
                      size="small"
                      disabled={passwordLoading}
                    />
                    {updatePasswordMessage.state !== "false" && (
                      <Typography
                        variant="caption"
                        className={classes.passwordMessage}
                        style={{
                          color:
                            updatePasswordMessage.state === "error"
                              ? "#ff0a0a"
                              : "#08be08",
                        }}
                      >
                        {updatePasswordMessage.message}
                      </Typography>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className={`${classes.changePasswordBtn} ${classes.btn}`}
                      disableElevation
                      disabled={passwordLoading}
                    >
                      {passwordLoading ? (
                        <Loading width={20} color="#272727" />
                      ) : (
                        <Typography
                          variant="caption"
                          className={classes.changePasswordBtnText}
                        >
                          Change Password
                        </Typography>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              <div className={styles.userOptionsBtnContainer}>
                <NextLink href="/wishlist">
                  <Button
                    variant="contained"
                    className={classes.btn}
                    disableElevation
                  >
                    My Wishlist
                  </Button>
                </NextLink>

                <NextLink href="/cart">
                  <Button
                    variant="contained"
                    className={classes.btn}
                    disableElevation
                  >
                    My Cart
                  </Button>
                </NextLink>

                <Button
                  className={`${classes.btn} ${classes.signoutBtn}`}
                  variant="contained"
                  color="secondary"
                  onClick={signoutHandler}
                  disableElevation
                >
                  SignOut
                </Button>
              </div>
            </div>
          </React.Fragment>
        </Card>
      </section>
    </React.Fragment>
  );
}
