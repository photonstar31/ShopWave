import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/Nav.module.css";
import {
  Typography,
  makeStyles,
  Select,
  MenuItem,
  Button,
  ClickAwayListener,
} from "@material-ui/core";
import { FormControl } from "@mui/material";

import User from "../../icons/User";
import Heart from "../../icons/Heart";
import AddToCart from "../../icons/AddToCart";
import SearchGlass from "../../icons/SearchGlass";

import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import { useAppContext } from "../../../store/context/appContext";
import Loading from "../Loading/Loading";

import { doc, getFirestore, updateDoc } from "firebase/firestore";

const db = getFirestore();

const pagesLink = ["home", "products", "contact", "about"];

const useStyles = makeStyles((theme) => {
  return {
    navHeading: {
      marginRight: 88,
      cursor: "pointer",
      color: "#101750",
      transition: "all .3s",
      "&:hover": {
        color: "#18296a",
      },
      [theme.breakpoints.down(1000)]: {
        fontSize: 32,
      },
      [theme.breakpoints.down(500)]: {
        display: "none",
      },
    },
    topNavLinkText: {
      lineHeight: "16px",
      fontWeight: 600,
      color: "#F1F1F1",
    },
    BottomNavLinkText: {
      color: "#0D0E43",
      cursor: "pointer",
      textTransform: "capitalize",
      borderBottom: "1.8px solid transparent",
    },
    searchBtn: {
      padding: 0,
      maxWidth: 51,
      minWidth: 51,
      height: 40,
      borderRadius: 0,
      [theme.breakpoints.down(701)]: {
        maxWidth: "max-content",
        minWidth: "max-content",
        background: "transparent",
        marginLeft: "auto",
        "&:hover": {
          background: "transparent",
        },
        "&:active": {
          background: "transparent",
        },
        "& > span > svg *": {
          fill: "#4c4b4b",
        },
      },
    },
    activeLink: {
      color: "#FB2E86",
      borderBottomColor: "#FB2E86",
    },
    select: {
      fontSize: 16,
      "& > div": {
        fontSize: 16,
        fontFamily: "Lato",
        fontWeight: 400,
        color: "#f1f1f1",
        "&:focus": {
          backgroundColor: "transparent",
        },
      },
      "& > svg": {
        color: "#f1f1f1",
        fontSize: 20,
      },
    },
    menuItem: {
      fontSize: 16,
      lineHeight: "16px",
      fontWeight: 400,
      color: "#000",
      textTransform: "capitalize",
      padding: 0,
    },
    pageSelect: {
      fontSize: 16,
      "& div:focus": {
        backgroundColor: "transparent",
      },
    },
  };
});

export default function Nav() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    setCurrencyType,
    currencyType,
    cartLength,
    isUserLoggedIn,
    accountLoading,
    userInfo,
  } = useAppContext();

  const classes = useStyles();

  const [currency, setCurrency] = useState("usd");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [width, setWidth] = useState(0);

  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    setCurrency(
      userInfo && userInfo.userData.currency
        ? userInfo.userData.currency
        : "usd"
    );
  }, [accountLoading]);

  useEffect(() => {
    setCurrency(currencyType);
  }, [currencyType]);

  const currencyChangeHandler = (event) => {
    setCurrency(event.target.value);
    setCurrencyType(event.target.value);

    if (!isUserLoggedIn) {
      return;
    }

    const updateCurrency = async () => {
      const userRef = doc(db, "users", userInfo.docId);
      await updateDoc(userRef, {
        currency: event.target.value,
      });
    };
    updateCurrency();
  };

  const showSearchInputHandler = () => {
    setShowSearchInput(true);
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = searchInputRef.current?.value
      .replace(/\s/g, "-")
      .toLocaleLowerCase();
    if (searchValue.trim().length < 1) {
      return;
    }
    router.push(`/products/${searchValue}`);
    setShowSearchInput(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navTopContainer}>
        <div className={styles.navTopLinksContainer}>
          <FormControl style={{ marginRight: 17.67 }} variant="standard">
            {!accountLoading ? (
              <Select
                className={classes.select}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={currency}
                onChange={currencyChangeHandler}
                disableUnderline
              >
                {currency === "usd" ? (
                  <MenuItem className={classes.menuItem} value={currency}>
                    USD
                  </MenuItem>
                ) : (
                  <MenuItem className={classes.menuItem} value="usd">
                    USD
                  </MenuItem>
                )}
                <MenuItem className={classes.menuItem} value="inr">
                  INR
                </MenuItem>
              </Select>
            ) : (
              <Loading width={15} color="#f1f1f1" />
            )}
          </FormControl>
          <NextLink href={!isUserLoggedIn ? "/login" : "/profile"}>
            <span
              color="textSecondary"
              className={styles.topNavLink}
              style={{ marginRight: 19 }}
            >
              {!accountLoading ? (
                <React.Fragment>
                  <Typography
                    className={classes.topNavLinkText}
                    variant="subtitle2"
                  >
                    {!isUserLoggedIn ? "Login" : "Account"}
                  </Typography>
                  <User />
                </React.Fragment>
              ) : (
                <Loading width={15} color="#f1f1f1" />
              )}
            </span>
          </NextLink>
          <NextLink href="/wishlist">
            <span
              color="textSecondary"
              className={styles.topNavLink}
              style={{ marginRight: 29.83 }}
            >
              <Typography
                className={classes.topNavLinkText}
                variant="subtitle2"
              >
                Wishlist
              </Typography>
              <Heart />
            </span>
          </NextLink>

          <NextLink href="/cart">
            <span
              color="textSecondary"
              className={`${styles.cartContainer} ${styles.topNavLink}`}
            >
              {cartLength > 0 && (
                <span className={styles.cartItemLength}>
                  <Typography variant="caption">{cartLength}</Typography>
                </span>
              )}
              <AddToCart />
            </span>
          </NextLink>
        </div>
      </div>

      <div className={styles.navBottomContainer}>
        <div className={styles.navBottomInnerContainer}>
          <NextLink href="/">
            <Typography className={classes.navHeading} variant="h5">
              Hekto
            </Typography>
          </NextLink>
          <div className={styles.navBottomLinksContainer}>
            {pagesLink.map((link, i) => {
              return (
                <NextLink href={link === "home" ? "/" : `/${link}`} key={i}>
                  <Typography
                    variant="subtitle2"
                    className={`${classes.BottomNavLinkText} ${
                      link === "home"
                        ? router.pathname === "/" && classes.activeLink
                        : router.pathname.includes(link) && classes.activeLink
                    }
                      `}
                  >
                    {link}
                  </Typography>
                </NextLink>
              );
            })}
          </div>

          <ClickAwayListener
            onClickAway={() => {
              console.log("helloo");
              setShowSearchInput(false);
            }}
          >
            <form onSubmit={formSubmitHandler} className={styles.navBottomForm}>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.navBottomInput}
                style={{
                  display:
                    width < 700
                      ? showSearchInput
                        ? "block"
                        : "none"
                      : "block",
                }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disableElevation
                className={classes.searchBtn}
                onClick={showSearchInputHandler}
              >
                <SearchGlass />
              </Button>
            </form>
          </ClickAwayListener>
        </div>
      </div>
    </nav>
  );
}
