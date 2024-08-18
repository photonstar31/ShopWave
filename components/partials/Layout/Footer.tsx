import React from "react";
import styles from "../../../styles/Footer.module.css";
import {
  Typography,
  Button,
  TextField,
  Link,
  makeStyles,
} from "@material-ui/core";

import Facebook from "../../icons/Facebook";
import Instagram from "../../icons/Instagram";
import Twitter from "../../icons/Twitter";

const linkData = [
  {
    title: "Categories",
    links: [
      "Laptops & Computers",
      "Cameras & Photography",
      "Smart Phones & Tablets",
      "Video Games & Consoles",
      "Waterproof Headphones",
    ],
  },
  {
    title: "Customer Care",
    links: [
      "My Account",
      "Discount",
      "Returns",
      "Orders History",
      "Order Tracking",
    ],
  },
  {
    title: "Pages",
    links: [
      "Browse the Shop",
      "Category",
      "Pre-Built Pages",
      "Visual Composer Elements",
      "WooCommerce Pages",
    ],
  },
];

const useStyles = makeStyles({
  textField: {
    "& > div": {
      "& > *": {
        border: "none",
        fontWeight: 300,
      },
    },
  },
  label: {
    color: "red",
    padding: 100,
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTopContainer}>
        <div className={styles.contactContainer}>
          <Typography
            variant="h4"
            style={{
              fontSize: 38,
              lineHeight: "44.53px",
              marginBottom: 31,
              fontWeight: "bold",
            }}
          >
            Hekto
          </Typography>
          <form className={styles.form}>
            {/* <input type="text" className={styles.input} placeholder    /> */}
            <TextField
              type="email"
              variant="outlined"
              label="Enter Email Address"
              size="small"
              className={classes.textField}
              InputLabelProps={{ style: { color: "#8A8FB9", fontWeight: 400 } }}
              style={{ height: "44px", padding: 0, fontSize: 16 }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ width: 135, height: 39, textTransform: "capitalize" }}
              disableElevation
            >
              Sign Up
            </Button>
          </form>

          <Typography
            variant="subtitle2"
            style={{ fontWeight: 400, marginBottom: 10 }}
            color="primary"
          >
            Contact Info
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ fontWeight: 400, marginBottom: 10 }}
            color="primary"
          >
            17 Princess Road, London, Greater London NW1 8JR, UK
          </Typography>
        </div>

        {linkData.map((link, i) => {
          return (
            <div
              key={i}
              className={`${styles.footerLinkContainer} ${
                styles["footerLinkContainer" + i]
              }`}
            >
              <Typography style={{ marginBottom: 42 }} variant="h6">
                {link.title}
              </Typography>
              {link.links.map((item) => {
                return (
                  <Link key={item} style={{ cursor: "pointer" }}>
                    <Typography variant="subtitle2">{item}</Typography>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className={styles.footerBottomContainer}>
        <Typography
          variant="subtitle2"
          style={{ color: "#9DA0AE", marginRight: 660 }}
        >
          ©Webecy - All Rights Reserved
        </Typography>

        <div className={styles.footerIconsContainer}>
          <span className={styles.icon}>
            <Facebook />
          </span>
          <span className={styles.icon}>
            <Instagram />
          </span>
          <span className={styles.icon}>
            <Twitter />
          </span>
        </div>
      </div>
    </footer>
  );
}
