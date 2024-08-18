import React from "react";
import Header from "../components/partials/Header/Header";
import { TextField, Typography, makeStyles, Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import Image from "next/dist/client/image";
import contactImg from "../assets/img/contactImg.png";
import styles from "../styles/Contact.module.css";
import Divider from "../components/partials/Divider/Divider";

const useStyle = makeStyles((theme) => {
  return {
    textField: {
      "& > label": {
        color: "#8A8FB9",
        fontWeight: 300,
        fontSize: 16,
      },
      "& > div": {
        fontSize: 16,
        fontWeight: 300,
      },
    },
    textFieldTextMsge: {
      marginTop: "47px",
      marginBottom: "30px",
      "& > div": {
        height: 166,
        alignItems: "flex-start",
      },
    },
    heading: {
      lineHeight: "48px",
      fontWeight: "bold",
      color: "#151875",
      [theme.breakpoints.down("xs")]: {
        fontSize: 30,
      },
    },

    color151875: {
      color: "#151875",
    },
    pink2: { backgroundColor: "#FB2E86" },
    skinny: { backgroundColor: "#FFB265" },
    green: { backgroundColor: "#1BE982" },
    descriptionText: {
      paddingTop: "5px",
      color: "#8A8FB9",
      lineHeight: "25.6px",
      fontFamily: "lato",
    },
    text: {
      lineHeight: "25.6px",
      color: "#8A8FB9",
    },
    infoAboutText: {
      marginTop: "13px",
      marginBottom: "42px",
    },
    getInTouchText: {
      marginTop: "20px",
    },

    formBtn: {
      textTransform: "capitalize",
      width: "157px",
      height: "44px",
      borderRadius: 3,
      "&:hover": {
        boxShadow: "1px 5px 5px rgba(0,0,0,.12)",
      },
      "&:active": {
        boxShadow: "none",
      },
    },
    formBtnText: {
      lineHeight: "25.6px",
    },
  };
});

const contactus = () => {
  const classes = useStyle();

  return (
    <React.Fragment>
      <Header heading="Contact Us" path="Contact Us" />
      <section className={styles.contact}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          className={styles.textContainer}
        >
          <Grid item className={styles.infoAboutUs}>
            <Typography variant="h3" className={classes.heading}>
              Information About Us
            </Typography>

            <Typography
              variant="subtitle2"
              className={`${classes.text} ${classes.infoAboutText}`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </Typography>

            <div className={styles.infoCircleContainer}>
              <span className={`${styles.circle}`} />
              <span className={`${styles.circle} ${styles.pink}`} />
              <span className={`${styles.circle} ${styles.skyBlue}`} />
            </div>
          </Grid>

          <Grid item className={styles.contactWay}>
            <Typography variant="h3" className={classes.heading}>
              Contact Way
            </Typography>

            <Grid
              container
              justifyContent="space-between"
              className={styles.contactWayInfo}
            >
              <Grid item className={styles.contactWayInfo_LeftSide}>
                <span className={styles.contactWayInfo_container}>
                  <span
                    className={`${styles.blueBall} ${styles.contactWayInfo_ball}`}
                  />
                  <span className={styles.contactWayInfo_text}>
                    <Typography variant="subtitle2" className={classes.text}>
                      Tel: 877-67-88-99
                    </Typography>
                    <Typography variant="subtitle2" className={classes.text}>
                      E-Mail: shop@store.com
                    </Typography>
                  </span>
                </span>

                <span className={styles.contactWayInfo_container}>
                  <span
                    className={`${styles.yellowBall} ${styles.contactWayInfo_ball}`}
                  />
                  <span className={styles.contactWayInfo_text}>
                    <Typography variant="subtitle2" className={classes.text}>
                      20 Margaret st, London
                    </Typography>
                    <Typography variant="subtitle2" className={classes.text}>
                      Great britain, 3NM98-LK
                    </Typography>
                  </span>
                </span>
              </Grid>
              <Grid item className={styles.contactWayInfo_RightSide}>
                <span className={styles.contactWayInfo_container}>
                  <span
                    className={`${styles.pinkBall} ${styles.contactWayInfo_ball}`}
                  />
                  <span className={styles.contactWayInfo_text}>
                    <Typography variant="subtitle2" className={classes.text}>
                      Support Forum
                    </Typography>
                    <Typography variant="subtitle2" className={classes.text}>
                      For over 24hr
                    </Typography>
                  </span>
                </span>

                <span className={styles.contactWayInfo_container}>
                  <span
                    className={`${styles.greenBall} ${styles.contactWayInfo_ball}`}
                  />
                  <span className={styles.contactWayInfo_text}>
                    <Typography variant="subtitle2" className={classes.text}>
                      Free standard shipping
                    </Typography>
                    <Typography variant="subtitle2" className={classes.text}>
                      on all orders.
                    </Typography>
                  </span>
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="space-between"
          columnGap="16px"
          className={styles.contactInfo}
        >
          <Grid item className={styles.contactInfoText}>
            <div className={styles.getInTouch}>
              <Typography variant="h3" className={classes.heading}>
                Get In Touch
              </Typography>

              <Typography
                variant="subtitle2"
                className={`${classes.getInTouchText} ${classes.text}`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
                neque ultrices tristique amet erat vitae eget dolor los vitae
                lobortis quis bibendum quam.
              </Typography>
            </div>

            <form className={styles.form}>
              <div className={styles.displayFlex}>
                <TextField
                  className={classes.textField}
                  required
                  variant="outlined"
                  size="small"
                  label="Your Name"
                  style={{ width: "255px" }}
                />
                <TextField
                  className={classes.textField}
                  required
                  variant="outlined"
                  size="small"
                  label="Your Email"
                  style={{ width: "255px" }}
                />
              </div>
              <TextField
                className={classes.textField}
                required
                variant="outlined"
                size="small"
                label="Subject"
                fullWidth
                style={{ marginTop: "34px" }}
              />
              <TextField
                className={`${classes.textFieldTextMsge} ${classes.textField}`}
                variant="outlined"
                size="small"
                required
                label="Type Your Message"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.formBtn}
                disableElevation
              >
                <Typography variant="body2" className={classes.formBtnText}>
                  send mail
                </Typography>
              </Button>
            </form>
          </Grid>

          <Grid item className={styles.contactInfoImageContainer}>
            <Image src={contactImg} alt="contact-img" />
          </Grid>
        </Grid>
      </section>

      <Divider />
    </React.Fragment>
  );
};

export default contactus;

/*

<section className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.subContainer1}>
            <div className={styles.subContainer1Left}>
              <Typography
                color="secondary"
                className={classes.heading}
                variant="h3"
              >
                Information About us
              </Typography>
              <Typography
                variant="body2"
                className={`${classes.infoAboutText} ${classes.text}`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
                neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
                tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
                vitae lobortis quis bibendum quam.
              </Typography>
              <div className={styles.circleContainer}>
                <span className={`${styles.circle}`} />
                <span className={`${styles.circle} ${classes.pink}`} />
                <span className={`${styles.circle} ${classes.blue}`} />
              </div>
              <Typography
                color="secondary"
                className={classes.heading}
                variant="h3"
                style={{
                  marginTop: "175px",
                }}
              >
                Get in touch
              </Typography>

              <Typography
                variant="body2"
                className={`${classes.getInTouchText} ${classes.text}`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
                neque ultrices tristique amet erat vitae eget dolor los vitae
                lobortis quis bibendum quam.
              </Typography>
              <form className={styles.sendMailBox}>
                <div className={styles.sendMailBoxSlice1}>
                  <TextField
                    className={classes.textField}
                    required
                    variant="outlined"
                    size="small"
                    label="Your Name"
                    style={{ width: "255px" }}
                  />
                  <TextField
                    className={classes.textField}
                    required
                    variant="outlined"
                    size="small"
                    label="Your Email"
                    style={{ width: "255px" }}
                  />
                </div>
                <TextField
                  className={classes.textField}
                  required
                  variant="outlined"
                  size="small"
                  label="Subject"
                  style={{ width: "534px", marginTop: "34px" }}
                />
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  required
                  label="Type Your Message"
                  style={{
                    width: "534px",
                    marginTop: "47px",
                    marginBottom: "30px",
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.formBtn}
                  disableElevation
                >
                  <Typography variant="body2" className={classes.formBtnText}>
                    send mail
                  </Typography>
                </Button>
              </form>
            </div>
            <div className={styles.subContainer1Right}>
              <Typography
                color="secondary"
                className={classes.heading}
                variant="h3"
                style={{ marginBottom: "25px" }}
              >
                Contact Way
              </Typography>

              <Grid
                container
                rowGap="49px"
                alignItems="center"
                justifyContent="space-between"
                className={styles.addressBox}
              >
                <Grid item className={styles.descriptionBox}>
                  <span className={`${styles.circle2}`} />
                  <div className={styles.descriptionTextBox}>
                    <Typography
                      variant="body2"
                      className={classes.descriptionText}
                    >
                      Tel: 877-67-88-99
                    </Typography>

                    <Typography
                      variant="body2"
                      style={{ width: "182px" }}
                      className={classes.descriptionText}
                    >
                      E-Mail: shop@store.com
                    </Typography>
                  </div>
                </Grid>
                <Grid item className={styles.descriptionBox}>
                  <span className={`${styles.circle2} ${classes.pink2}`} />
                  <div className={styles.descriptionTextBox}>
                    <Typography
                      variant="body2"
                      className={classes.descriptionText}
                    >
                      Support Forum
                    </Typography>

                    <Typography
                      variant="body2"
                      className={classes.descriptionText}
                    >
                      For over 24hr
                    </Typography>
                  </div>
                </Grid>
                <Grid item className={styles.descriptionBox}>
                  <span className={`${styles.circle2} ${classes.skinny}`} />
                  <div className={styles.descriptionTextBox}>
                    <Typography
                      variant="body2"
                      className={classes.descriptionText}
                    >
                      20 Margaret st, London
                    </Typography>

                    <Typography
                      variant="body2"
                      className={classes.descriptionText}
                    >
                      Great britain, 3NM98-LK
                    </Typography>
                  </div>
                </Grid>
                <Grid item className={styles.descriptionBox}>
                  <span className={`${styles.circle2} ${classes.green}`} />
                  <div className={styles.descriptionTextBox}>
                    <Typography
                      variant="body2"
                      className={classes.descriptionText}
                    >
                      Free standard shipping
                    </Typography>

                    <Typography
                      variant="body2"
                      className={classes.descriptionText}
                    >
                      On all orders.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={styles.imageBox}>
            <Image src={contactImg} alt="contactImg" />
          </div>
        </div>
      </section>
*/
