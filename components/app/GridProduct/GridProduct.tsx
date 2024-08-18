import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Card, Typography, Button } from "@material-ui/core";
import { ClickAwayListener } from "@mui/material";
import styles from "../../../styles/GridProduct.module.css";
import { ProductPageData as GridProductType } from "../../../store/types/types";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../../../store/context/appContext";
import AddToCart from "../../icons/AddToCart";
import ZoomGlass from "../../icons/ZoomGlass";
import Heart from "../../icons/Heart";
import Loading from "../../partials/Loading/Loading";
import { Favorite, ShoppingCart } from "@mui/icons-material";

const useStyles = makeStyles((theme) => {
  return {
    color151875: {
      color: "#151875",
    },
    colorFB2E86: {
      color: "#FB2E86",
      textDecoration: "line-through",
    },
    productCard: {
      width: 270,
      height: 363,
      borderRadius: 2,
      cursor: "pointer",
      padding: 3,
      boxShadow: "0 3px 6px rgba(0,0,0,.12)",
      transition: "all .3s",
      "&:hover": {
        boxShadow: "1px 5px 12px rgba(0,0,0,.15)",
        [theme.breakpoints.down("xs")]: {
          boxShadow: "0 3px 6px rgba(0,0,0,.12)",
        },
      },
      [theme.breakpoints.down(701)]: {
        width: 240,
        height: 330,
      },
      [theme.breakpoints.down("xs")]: {
        width: 200,
        height: 285,
      },

      [theme.breakpoints.down(460)]: {
        width: 215,
        height: 300,
      },
    },
    btn: {
      maxWidth: 30,
      minWidth: 30,
      minHeight: 30,
      maxHeight: 30,
      borderRadius: 500,
      padding: 6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backfaceVisibility: "hidden",
      transition: "all .1s",
      "&:hover": {
        backgroundColor: "#fff",
      },
      "& span > svg": {
        width: 15,
        height: 15,
      },
      "& span > svg *": {
        fill: "#151875",
      },
    },
  };
});

const GridProduct: React.FC<{
  product: GridProductType;
  href: string;
  toggleCartHandler: (id: number) => void;
  toggleWishlistHandler: (id: number) => void;
  userCartState: number[];
  userWishlistState: number[];
  showIcons: boolean;
}> = ({
  product,
  href,
  userCartState,
  toggleWishlistHandler,
  toggleCartHandler,
  userWishlistState,
  showIcons,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { currencyType, accountLoading } = useAppContext();
  const [currency, setCurrency] = useState(0);
  const [onHover, setOnHover] = useState(false);

  /**
   * managing price whenevery currency type changes
   */
  useEffect(() => {
    setCurrency(currencyType === "usd" ? 1 : 75);
  }, [currencyType]);

  const iconHoverHandler = () => {
    setOnHover(true);
  };
  const iconLeaveHandler = () => {
    setOnHover(false);
  };
  const goToItemHandler = () => {
    if (onHover) return;
    router.push(href);
  };

  return (
    <Grid item>
      <Card
        className={`${classes.productCard} ${styles.productCard}`}
        onClick={goToItemHandler}
      >
        <div className={styles.productImageContainer}>
          <Image src={product.img} alt={product.title} />

          {showIcons && (
            <div
              className={styles.productIconContainer}
              onMouseEnter={iconHoverHandler}
              onMouseLeave={iconLeaveHandler}
            >
              <Button
                className={classes.btn}
                onClick={() => {
                  toggleCartHandler(product.id);
                }}
              >
                {accountLoading ? (
                  <Loading width={15} color="#111C85" />
                ) : userCartState.includes(product.id) ? (
                  <ShoppingCart />
                ) : (
                  <AddToCart />
                )}
              </Button>
              <Button
                className={classes.btn}
                onClick={() => {
                  router.push(href);
                }}
              >
                {accountLoading ? (
                  <Loading width={15} color="#111C85" />
                ) : (
                  <ZoomGlass />
                )}
              </Button>
              <Button
                className={classes.btn}
                onClick={() => {
                  toggleWishlistHandler(product.id);
                }}
              >
                {accountLoading ? (
                  <Loading width={15} color="#111C85" />
                ) : userWishlistState.includes(product.id) ? (
                  <Favorite />
                ) : (
                  <Heart />
                )}
              </Button>
            </div>
          )}
        </div>
        <div className={styles.textContainer}>
          <Typography
            variant="subtitle1"
            className={classes.color151875}
            style={{ marginBottom: 8, textTransform: "capitalize" }}
          >
            {product.title.trim().length > 20
              ? `${product.title.slice(0, 20)}...`
              : product.title}
          </Typography>

          <div className={styles.colorfulDotsContainer}>
            <span className={styles.colorfulDot} />
            <span className={styles.colorfulDot} />
            <span className={styles.colorfulDot} />
          </div>

          <div className={styles.productPriceContainer}>
            <Typography
              variant="caption"
              style={{
                fontFamily: "Josefin Sans",
                fontWeight: 400,
              }}
              className={classes.color151875}
            >
              {currency === 1 ? (
                <React.Fragment>&#36;</React.Fragment> // dollar
              ) : (
                <React.Fragment>&#8377;</React.Fragment> // rupee
              )}
              {(product.price * currency).toFixed(2)}
            </Typography>

            <Typography
              variant="caption"
              style={{
                fontFamily: "Josefin Sans",
                fontWeight: 400,
              }}
              className={classes.colorFB2E86}
            >
              {currency === 1 ? (
                <React.Fragment>&#36;</React.Fragment> // dollar
              ) : (
                <React.Fragment>&#8377;</React.Fragment> // rupee
              )}
              {(product.orignalPrice * currency).toFixed(2)}
            </Typography>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default GridProduct;
