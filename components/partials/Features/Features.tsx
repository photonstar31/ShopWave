import React from "react";
import styles from "../../../styles/Features.module.css";
import { makeStyles, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import Image from "next/image";

import freeDelivery from "../../../assets/img/free-delivery.png";
import fullHoursSupport from "../../../assets/img/24-hours-support.png";
import cashback from "../../../assets/img/cashback.png";
import premiumQuality from "../../../assets/img/premium-quality.png";

const useStyles = makeStyles({
  color151875: {
    color: "#151875",
  },
  feature: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    marginBottom: 20,
    textTransform: "capitalize",
    fontWeight: 700,
  },
});

const shopexFeaturesData = [
  {
    img: freeDelivery,
    title: "Free Delivery",
  },
  {
    img: cashback,
    title: "100% cash back",
  },
  {
    img: premiumQuality,
    title: "quality product",
  },
  {
    img: fullHoursSupport,
    title: "24/7 support",
  },
];

export default function Features() {
  const classes = useStyles();

  return (
    <Grid container columnGap="28px" className={styles.featuresContainer}>
      {shopexFeaturesData.map((feature, i) => {
        return (
          <Grid key={i} item className={`${classes.feature} ${styles.feature}`}>
            <span className={styles.featureImage}>
              <Image src={feature.img} alt="img" />
            </span>
            <Typography
              variant="h6"
              className={`${classes.featureTitle} ${classes.color151875}`}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body2"
              style={{
                lineHeight: "25.6px",
                color: "#bab6ce",
                marginBottom: 45,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br /> Massa purus gravida.
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
