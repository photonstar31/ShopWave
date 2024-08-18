import { Typography, makeStyles } from "@material-ui/core";
import React from "react";
import styles from "../../../styles/Header.module.css";
import Divider from "../Divider/Divider";

const useStyles = makeStyles((theme) => {
  return {
    heading: {
      textTransform: "capitalize",
      color: "#101750",
      marginBottom: 9,
      fontWeight: "bold",
      [theme.breakpoints.down("xs")]: {
        fontSize: 29,
      },
    },
    path: {
      fontWeight: 500,
      [theme.breakpoints.down("xs")]: {
        fontSize: 15,
      },
    },
  };
});

const Header: React.FC<{ heading: string; path: string }> = ({
  heading,
  path,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.innerContainer}>
          <Typography variant="h3" className={classes.heading}>
            {heading}
          </Typography>
          <Typography variant="subtitle2" className={classes.path}>
            Home . Pages . <span className={styles.path}>{path}</span>
          </Typography>
        </div>
      </header>
      <Divider />
    </React.Fragment>
  );
};

export default Header;
