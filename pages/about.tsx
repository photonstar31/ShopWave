import React, { useState } from "react";
import styles from "../styles/AboutPage.module.css";
import Header from "../components/partials/Header/Header";
import Image from "next/image";
import { Grid } from "@mui/material";
import { Typography, makeStyles, Button } from "@material-ui/core";
import Features from "../components/partials/Features/Features";

import contactUsImg from "../assets/img/contact-img.png";
import client1 from "../assets/img/client1.png";
import client2 from "../assets/img/client2.png";
import client3 from "../assets/img/client3.png";
import client4 from "../assets/img/client4.png";
import client5 from "../assets/img/client5.png";
import client6 from "../assets/img/client6.png";
import client7 from "../assets/img/client7.png";
import client8 from "../assets/img/client8.png";
import Divider from "../components/partials/Divider/Divider";

const useStyles = makeStyles((theme) => {
  return {
    aboutCompanyHeading: {
      fontWeight: "bold",
      lineHeight: "48px",
      marginBottom: 14,
      color: "#151875",
      [theme.breakpoints.down("xs")]: {
        fontSize: 30,
      },
    },
    aboutCompanyText: {
      lineHeight: "25.6px",
      marginBottom: 48,
      fontFamily: "lato",
    },
    aboutCompanyBtn: {
      width: 145,
      height: 45,
      borderRadius: 3,
      textTransform: "capitalize",
      "&:hover": {
        boxShadow: "1px 5px 5px rgba(0,0,0,.12)",
      },
      "&:active": {
        boxShadow: "none",
      },
    },
    aboutCompanyBtnText: {
      lineHeight: "25.6px",
      fontFamily: "lato",
    },
    heading: {
      textTransform: "capitalize",
      marginBottom: 64,
      color: "#151875",
      [theme.breakpoints.down("xs")]: {
        fontSize: 35,
      },
    },
    clientName: {
      lineHeight: "25.6px",
      fontFamily: "lato",
      fontWeight: 600,
      textTransform: "capitalize",
    },
    clientProfession: {
      fontSize: 10,
      textTransform: "capitalize",
    },
    clientText: {
      marginTop: 14,
      marginBottom: 30,
      minHeight: 60,
    },

    aboutCompany: {
      maxWidth: 1150,
      margin: "auto",
      marginBottom: 106,
      [theme.breakpoints.down("lg")]: {
        flexDirection: "column",
      },
    },
    aboutCompanyimageContainer: {
      width: 570,
      height: 409,
      [theme.breakpoints.down("lg")]: {
        width: 520,
      },
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        height: "auto",
      },
    },
    textContainer: {
      maxWidth: 550,
      [theme.breakpoints.down("lg")]: {
        textAlign: "center",
        marginTop: 48,
      },
    },
  };
});

const clientData = [
  {
    img: client2,
    name: "Selina Gomez",
    profession: "Ceo At Webecy Digital",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
    id: 1,
  },
  {
    img: client1,
    name: "John Hanry",
    profession: "Feo At W.A Bingle",
    text: "Lorem ipsum dolor sit amet, consectetur sed sapien egestas ac nam adipiscing elit. sed sapien egestas ac nam. Tristique ultrices dolor sed sapien egestas ac nam aliquam lacus volutpat sed sapien egestas ac nam praesent.",
    id: 2,
  },
  {
    img: client3,
    name: "robert subway",
    profession: "singer",
    text: "Lorem ipsum dolor sit amet sed sapien egestas ac nam, consectetur adipiscing elit. Non duis ultrices quam vel arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
    id: 3,
  },
  {
    img: client6,
    name: "mille walker",
    profession: "actor",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
    id: 4,
  },
  {
    img: client4,
    name: "albert way",
    profession: "doctor",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Tristique ultrices dolor aliquam lacus volutpat praesent.",
    id: 5,
  },
  {
    img: client5,
    name: "steave rob",
    profession: "Ceo At Webecy Digital",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
    id: 6,
  },
  {
    img: client7,
    name: "john cartor",
    profession: "singer",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
    id: 7,
  },
  {
    img: client8,
    name: "Sharon Carter",
    profession: "Feo At W.A Bingle",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Tristique ultrices dolor aliquam lacus volutpat praesent.",
    id: 8,
  },
  {
    img: client2,
    name: "emma stone",
    profession: "Ceo At W.C Digital",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
    id: 9,
  },
];

export default function about() {
  const classes = useStyles();
  const [activeLink, setActiveLink] = useState(1);
  const [activeClient, setActiveClient] = useState(1);

  const btns = [1, 2, 3];

  return (
    <React.Fragment>
      <Header heading="about us" path="about us" />
      <section className={styles.about}>
        <Grid
          container
          columnGap="30px"
          alignItems="center"
          className={classes.aboutCompany}
        >
          <Grid item className={classes.aboutCompanyimageContainer}>
            <Image src={contactUsImg} alt="contactusimg" />
          </Grid>
          <Grid item className={classes.textContainer}>
            <Typography variant="h3" className={classes.aboutCompanyHeading}>
              Know About Our Ecomerce Business, History
            </Typography>

            <Typography
              variant="body2"
              className={classes.aboutCompanyText}
              color="primary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              className={classes.aboutCompanyBtn}
              disableElevation
            >
              <Typography
                variant="subtitle1"
                className={classes.aboutCompanyBtnText}
              >
                Contact us
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Divider />

        <div className={styles.features}>
          <Typography variant="h2" className={classes.heading}>
            Our Features
          </Typography>

          <Features />
        </div>

        <Divider />

        <div className={styles.client}>
          <div className={styles.clientInnerContainer}>
            <Typography variant="h2" className={classes.heading}>
              our client say!
            </Typography>

            <div className={styles.clientImgContainer}>
              {clientData
                .slice((activeLink - 1) * 3, activeLink * 3)
                .map((client, i) => {
                  return (
                    <div
                      key={i}
                      className={`${styles.clientImage} ${
                        activeClient === client.id ? styles.activeClient : ""
                      } `}
                      onClick={() => {
                        setActiveClient(client.id);
                      }}
                    >
                      <Image
                        width={55}
                        height={55}
                        src={client.img}
                        alt="img"
                      />
                    </div>
                  );
                })}
            </div>
            <Typography variant="h6" className={classes.clientName}>
              {clientData[activeClient - 1].name}
            </Typography>
            <Typography
              variant="overline"
              className={classes.clientProfession}
              color="primary"
            >
              {clientData[activeClient - 1].profession}
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.clientText}
              color="primary"
            >
              {clientData[activeClient - 1].text}
            </Typography>

            <div className={styles.clientBtnContainer}>
              {btns.map((btn, i) => {
                return (
                  <button
                    key={i}
                    className={`${styles.clientBtn} ${
                      btn === activeLink ? styles.activeClientBtn : ""
                    }`}
                    onClick={() => {
                      setActiveLink(btn);
                      setActiveClient((btn - 1) * 3 + 1);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

/*

{
    img: client2,
    name: "mille walker",
    profession: "actor",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
  },
  {
    img: client1,
    name: "amber way",
    profession: "doctor",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
  },
  {
    img: client3,
    name: "steave rob",
    profession: "Ceo At Webecy Digital",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
  },
  {
    img: client1,
    name: "mike smiller",
    profession: "singer",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
  },
  {
    img: client2,
    name: "elizabeth walson",
    profession: "Feo At W.A Bingle",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
  },
  {
    img: client3,
    name: "emma stone",
    profession: "Ceo At W.C Digital",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.",
  },

  */
