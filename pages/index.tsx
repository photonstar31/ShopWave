import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import NextLink from "next/link";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import { getLocalUserData } from "../store/localUserData";

const db = getFirestore();

import lamp from "../assets/img/headerlamp.png";
import couch from "../assets/img/headerCouch.png";
import couch2 from "../assets/img/featureOfLatestTrending.png";

import ZoomGlass from "../components/icons/ZoomGlass";
import AddToCart from "../components/icons/AddToCart";
import Heart from "../components/icons/Heart";
import Sale from "../components/icons/Sale";
import Tick from "../components/icons/Tick";

import {
  latestProductsLink,
  trendingProductsOtherTrendingData,
  discountItemLink,
  discountItemData,
  topCategoryBtnData,
} from "../data/indexData";
import { storedData } from "../data/allData";
import Divider from "../components/partials/Divider/Divider";
import { useAppContext } from "../store/context/appContext";
import Features from "../components/partials/Features/Features";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles((theme) => {
  return {
    heading: {
      [theme.breakpoints.down(1300)]: {
        fontSize: 40,
        lineHeight: "55px",
      },
      [theme.breakpoints.down(800)]: {
        fontSize: 30,
        lineHeight: "40px",
      },
    },
    headerBtn: {
      padding: "16px 40px",
      borderRadius: 2,
      textTransform: "capitalize",
    },
    featuredProductViewBtnText: {
      lineHeight: "12px",
      textTransform: "capitalize",
    },
    mainTrendingProduct: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    uniqueFeatureOfLatestTrendingProductsBtn: {
      padding: "14px 24px",
      minWidth: 157,
      borderRadius: 2,
      marginRight: 19,
      textTransform: "capitalize",
      fontWeight: "bold",
    },
    btnEffect: {
      "&:hover": {
        boxShadow: "1px 5px 5px rgba(0,0,0,.12)",
      },
      "&:active": {
        boxShadow: "none",
      },
    },
    greenBtn: {
      maxWidth: 94,
      minWidth: 94,
      minHeight: 29,
      padding: 0,
      borderRadius: 2,
      backgroundColor: "#08D15F",
      color: "#fff",
      position: "absolute",
      transition: "all .2s",
      "&:hover": {
        boxShadow: "0px 3px 4px rgba(0,0,0,.12)",
        backgroundColor: "#03B851",
      },
      "&:active": {
        boxShadow: "none",
      },
    },
    fontJosefinSans: {
      fontFamily: "Josefin Sans",
    },

    featuredProduct: {
      transition: "all .2s",
      "& > span": {
        color: "#151875",
      },
      "&:hover > *": {
        transition: "all .2s",
        color: "#fff",
      },
    },
    latestProductsLink: {
      fontWeight: 400,
      textTransform: "capitalize",
      fontFamily: "lato",
      cursor: "pointer",
      borderBottom: "2px solid transparent",
    },
    latestProductPrice: {
      fontFamily: "Josefin Sans",
      lineHeight: "16px",
      marginRight: 8.57,
    },

    color151875: {
      color: "#151875",
    },
    darkPurple: {
      color: "#1A0B5B",
    },
    displayFlex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    latestProductTitle: {
      lineHeight: "18.75px",
      transform: "rotate(0.36deg)",
      borderBottom: "2px solid #EEEFFB",
    },
  };
});

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
  const {
    currencyType,
    userInfo,
    setCartItemCtx,
    isUserLoggedIn,
    accountLoading,
  } = useAppContext();
  const [currency, setCurrency] = useState(0);

  //// states
  const [latestProductLink, setLatestProductLink] = useState(
    "LatestProductsNew Arrival"
  );
  const [discountItemActiveLink, setDiscountItemActiveLink] =
    useState("Wood Chair");
  const [topCategoryActiveLink, setTopCategoryActiveLink] = useState("1");
  const [featuredProductsActiveLink, setfeaturedProductsActiveLink] =
    useState("featuredProducts1");
  const [userCart, setUserCart] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);

  /**
   * data send functions
   */
  const sendCartData = (cartData: number[]) => {
    setCartItemCtx(cartData);

    if (!isUserLoggedIn) {
      /// user is not login, so we'll just save his data on localstorage
      localStorage.setItem("cart", `${cartData}`);
      return;
    }
    const sendData = async () => {
      const userRef = doc(db, "users", userInfo.docId);
      await updateDoc(userRef, {
        cart: cartData,
      });
    };

    sendData();
  };
  const sendWishlistData = (wishlistData: number[]) => {
    if (!isUserLoggedIn) {
      /// user is not login, so we'll just save his data on localstorage
      localStorage.setItem("wishlist", `${wishlistData}`);
      return;
    }
    const sendData = async () => {
      const userRef = doc(db, "users", userInfo.docId);
      await updateDoc(userRef, {
        wishlist: wishlistData,
      });
    };

    sendData();
  };

  /////////////////// useEffect
  /**
   * managing price whenevery currency type changes
   */
  useEffect(() => {
    setCurrency(currencyType === "usd" ? 1 : 75);
  }, [currencyType]);

  /**
   * setting user cart info
   */
  useEffect(() => {
    if (!isUserLoggedIn) {
      ////// get user cart, wishlist info from localstorage
      const localUserData = getLocalUserData();
      setUserCart(localUserData.cart);
      setUserWishlist(localUserData.wishlist);

      return;
    }
    if (accountLoading) {
      return;
    }
    const getUserData = async () => {
      const docRef = doc(db, "users", userInfo && userInfo.docId);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();

        setUserCart(data.cart ? data.cart : []);
        setUserWishlist(data.wishlist ? data.wishlist : []);
      } else {
        setUserCart([]);
        setUserWishlist([]);
      }
    };
    getUserData();
  }, [isUserLoggedIn, userInfo, accountLoading]);

  //// filtering data
  const featuredProductData = storedData.filter((product) => {
    return product.category.includes("FeaturedProducts");
  });
  const latestProductsData = storedData.filter((product) => {
    return product.category.includes("LatestProducts");
  });
  const trendingProductsData = storedData.filter((product) => {
    return product.category.includes("TrendingProducts");
  });
  const topCategoriesItemData = storedData.filter((product) => {
    return product.category.includes("TopCategories");
  });
  const otherTrendingChairData = storedData.filter((product) => {
    return product.category.includes("OtherTrendingChairData");
  });

  const featuredProductsBtns = [1, 2, 3, 4];

  /////// function handlers
  const toggleCartHandler = (id: number) => {
    if (userCart.includes(id)) {
      const updatedCart: number[] = userCart.filter((ids) => ids !== id);
      setUserCart(updatedCart);
      sendCartData(updatedCart);
    } else {
      sendCartData([...userCart, id]);
      setUserCart((prevId) => (prevId ? [...prevId, id] : [id]));
    }
  };

  const toggleWishlistHandler = (id: number) => {
    if (userWishlist.includes(id)) {
      const updatedWishlist: number[] = userWishlist.filter(
        (ids) => ids !== id
      );
      setUserWishlist(updatedWishlist);
      sendWishlistData(updatedWishlist);
    } else {
      sendWishlistData([...userWishlist, id]);
      setUserWishlist((prevId) => (prevId ? [...prevId, id] : [id]));
    }
  };

  return (
    <React.Fragment>
      {/* header section */}
      <header className={styles.header}>
        <div className={styles.textContainer}>
          <div className={styles.lampImg}>
            <Image src={lamp} alt="img" />
          </div>
          <div className={styles.text}>
            <Typography
              variant="body2"
              color="secondary"
              style={{ marginBottom: 12 }}
            >
              Best Furniture For Your Castle....
            </Typography>
            <Typography
              variant="h1"
              style={{ marginBottom: 12 }}
              className={classes.heading}
            >
              New Furniture Collection Trends in 2022
            </Typography>
            <Typography
              variant="body2"
              style={{ marginBottom: 28 }}
              color="primary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in
              est adipiscing in phasellus non in justo.
            </Typography>

            <NextLink href="/products">
              <Button
                className={`${classes.headerBtn} ${classes.btnEffect}`}
                variant="contained"
                color="secondary"
                disableElevation
              >
                <Typography
                  variant="subtitle2"
                  className={classes.fontJosefinSans}
                >
                  Shop Now
                </Typography>
              </Button>
            </NextLink>
          </div>
        </div>

        <div className={styles.imgContainer}>
          <Image src={couch} alt="couch" />
        </div>

        <div className={styles.btnContainer}>
          <Button
            variant="contained"
            color="secondary"
            style={{
              minWidth: 10,
              minHeight: 10,
              padding: 0,
              borderRadius: "0",
            }}
            disableElevation
          />
          <Button
            variant="outlined"
            style={{
              minWidth: 10,
              minHeight: 10,
              padding: 0,
              borderRadius: "0",
              border: "1px solid #fb2e86",
            }}
            disableElevation
          />
          <Button
            variant="outlined"
            style={{
              minWidth: 10,
              minHeight: 10,
              padding: 0,
              borderRadius: "0",
              border: "1px solid #fb2e86",
            }}
            disableElevation
          />
        </div>
      </header>
      <Divider />

      {/* featured product section */}
      <section className={styles.featuredProducts}>
        <Typography variant="h2" className={classes.darkPurple}>
          Featured Products
        </Typography>

        <div className={styles.featuredProductsContainer}>
          <div className={styles.featuredProductsInnerContainer}>
            {featuredProductData.map((product, i) => {
              return (
                product.categoryLink.includes(featuredProductsActiveLink) && (
                  <div
                    key={i}
                    className={`${styles.featuredProduct} ${classes.featuredProduct}`}
                  >
                    <div className={styles.featuredProductIconContainer}>
                      <span
                        className={styles.featuredProductIcon}
                        onClick={() => {
                          toggleCartHandler(product.id);
                        }}
                      >
                        {userCart.includes(product.id) ? (
                          <ShoppingCart />
                        ) : (
                          <AddToCart />
                        )}
                      </span>
                      <span
                        className={styles.featuredProductIcon}
                        onClick={() => {
                          toggleWishlistHandler(product.id);
                        }}
                      >
                        {userWishlist.includes(product.id) ? (
                          <Favorite />
                        ) : (
                          <Heart />
                        )}
                      </span>
                      <span
                        className={styles.featuredProductIcon}
                        onClick={() => {
                          router.push(
                            `/products/${product.type[0]}/${product.id}`
                          );
                        }}
                      >
                        <ZoomGlass />
                      </span>
                    </div>
                    <div className={styles.featuredProductImgContainer}>
                      <Image src={product.img} alt={product.title} />
                      <NextLink
                        href={`/products/${product.type[0]}/${product.id}`}
                      >
                        <Button
                          variant="contained"
                          className={`${styles.featuredProductViewBtn} ${classes.greenBtn}`}
                          disableElevation
                        >
                          <Typography
                            variant="overline"
                            className={classes.featuredProductViewBtnText}
                          >
                            View Details
                          </Typography>
                        </Button>
                      </NextLink>
                    </div>
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      style={{ lineHeight: "21.6px", fontWeight: 700 }}
                    >
                      {product.title}
                    </Typography>
                    <div className={styles.productImageBtnContainer}>
                      <span className={styles.productImgBtn1} />
                      <span className={styles.productImgBtn2} />
                      <span className={styles.productImgBtn3} />
                    </div>
                    <Typography
                      variant="caption"
                      style={{ lineHeight: "16.41px" }}
                    >
                      Code - Y523201
                    </Typography>
                    <Typography
                      variant="caption"
                      style={{
                        lineHeight: "16.41px",
                      }}
                      className={classes.displayFlex}
                    >
                      {currency === 1 ? (
                        <React.Fragment>&#36;</React.Fragment> // dollar
                      ) : (
                        <React.Fragment>&#8377;</React.Fragment> // rupee
                      )}
                      {(product.price * currency).toFixed(2)}
                    </Typography>
                  </div>
                )
              );
            })}
          </div>

          <div className={styles.featuredProductsBtnContainer}>
            {featuredProductsBtns.map((btn, i) => {
              return (
                <span
                  key={i}
                  className={`${styles.featuredProductsBtn} ${
                    featuredProductsActiveLink === `featuredProducts${btn}`
                      ? styles.featuredProductsActiveBtn
                      : ""
                  }`}
                  onClick={() => {
                    setfeaturedProductsActiveLink(`featuredProducts${btn}`);
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>
      <Divider />

      {/* latest product section */}
      <section className={styles.latestProducts}>
        <Typography variant="h2" style={{ color: "#151875" }}>
          Latest Products
        </Typography>

        {/* latestProducts links */}
        <div className={styles.latestProductsLinkContainer}>
          {latestProductsLink.map((link, i) => {
            return (
              <Typography
                key={i}
                variant="body1"
                className={`${classes.latestProductsLink}`}
                style={{
                  color:
                    latestProductLink === `LatestProducts${link}`
                      ? "#FB2E86"
                      : "#151875",
                  borderColor:
                    latestProductLink === `LatestProducts${link}`
                      ? "#FB2E86"
                      : "transparent",
                }}
                onClick={() => {
                  setLatestProductLink(`LatestProducts${link}`);
                }}
              >
                {link}
              </Typography>
            );
          })}
        </div>

        {/* latestProducts product  */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          columnGap="37px"
          rowGap="120px"
          className={styles.latestProductsContainer}
        >
          {latestProductsData.map((product, i) => {
            return (
              product.categoryLink.includes(latestProductLink) && (
                <NextLink
                  href={`products/${product.type[0]}/${product.id}`}
                  key={i}
                >
                  <Grid item className={styles.latestProduct}>
                    <div className={styles.latestProductImgContainer}>
                      {product.sale && (
                        <span className={styles.latestProductSaleImg}>
                          <Sale />
                        </span>
                      )}
                      <Image src={product.img} alt={product.title} />
                    </div>
                    <div className={styles.productText}>
                      <Typography
                        variant="body2"
                        className={`${classes.latestProductTitle} ${classes.color151875}`}
                      >
                        {product.title}
                      </Typography>
                      <span className={styles.latestProductsPriceContainer}>
                        <Typography
                          variant="caption"
                          className={`${classes.latestProductPrice} ${classes.displayFlex} ${classes.color151875}`}
                        >
                          {currency === 1 ? (
                            <React.Fragment>&#36;</React.Fragment> // dollar
                          ) : (
                            <React.Fragment>&#8377;</React.Fragment> // rupee
                          )}
                          {product.price * currency}
                        </Typography>
                        <Typography
                          variant="overline"
                          style={{
                            fontFamily: "Josefin Sans",
                            textDecoration: "line-through",
                          }}
                          className={classes.displayFlex}
                          color="secondary"
                        >
                          {currency === 1 ? (
                            <React.Fragment>&#36;</React.Fragment> // dollar
                          ) : (
                            <React.Fragment>&#8377;</React.Fragment> // rupee
                          )}
                          {product.orignalPrice * currency}
                        </Typography>
                      </span>
                    </div>
                  </Grid>
                </NextLink>
              )
            );
          })}
        </Grid>
      </section>
      <Divider />

      {/* feature shopex to offer section  */}
      <section className={styles.shopexFeatures}>
        <Typography
          variant="h2"
          className={classes.color151875}
          style={{ marginBottom: 55 }}
        >
          What Shopex Offer!
        </Typography>
        <Features />
      </section>
      <Divider />

      {/* feature of latest and trending products */}
      <section className={styles.featureOfLatestTrendingProducts}>
        <div className={styles.featureOfLatestTrendingInnerContainer}>
          <div className={styles.featureOfLatestTrendingImage}>
            <Image src={couch2} alt="couch2" />
          </div>

          <div className={styles.featureOfLatestTrendingText}>
            <Typography
              variant="h4"
              className={classes.color151875}
              style={{ fontWeight: "bold", marginBottom: 29 }}
            >
              Unique Features Of leatest & Trending Poducts
            </Typography>

            <span className={styles.fetureText}>
              <span
                className={`${styles.featureOfLatestTrendingPinkBall} ${styles.featureTextBall}`}
              />
              <Typography
                variant="subtitle2"
                style={{ color: "#ACABC3", lineHeight: "21.12px" }}
              >
                All frames constructed with hardwood solids and laminates
              </Typography>
            </span>

            <span className={styles.fetureText}>
              <span
                className={`${styles.featureOfLatestTrendingBlueBall} ${styles.featureTextBall}`}
              />
              <Typography
                variant="subtitle2"
                style={{ color: "#ACABC3", lineHeight: "21.12px" }}
              >
                Reinforced with double wood dowels, glue, screw - nails corner
                blocks and machine nails
              </Typography>
            </span>

            <span
              className={styles.fetureText}
              style={{
                marginBottom: 38,
              }}
            >
              <span
                className={`${styles.featureOfLatestTrendingSkyblueBall} ${styles.featureTextBall}`}
              />
              <Typography
                variant="subtitle2"
                style={{
                  color: "#ACABC3",
                  lineHeight: "21.12px",
                }}
              >
                Arms, backs and seats are structurally reinforced
              </Typography>
            </span>

            <div className={styles.featureOfLatestTrendingBtnAndPrice}>
              <Button
                variant="contained"
                className={`${classes.btnEffect} ${classes.uniqueFeatureOfLatestTrendingProductsBtn}`}
                color="secondary"
                disableElevation
                onClick={() => {
                  if (userCart.includes(79)) {
                    router.push("/cart");
                    return;
                  }
                  toggleCartHandler(79);
                }}
              >
                {userCart.includes(79) ? "Go" : "Add"} To Cart
              </Button>
              <span className={styles.featureOfLatestTrendingPrice}>
                <Typography
                  variant="caption"
                  style={{
                    lineHeight: "16.41px",
                    marginBottom: 3,
                    fontFamily: "Josefin Sans",
                    fontWeight: 600,
                  }}
                  className={classes.color151875}
                >
                  B&B Italian Sofa
                </Typography>
                <Typography
                  variant="caption"
                  style={{ lineHeight: "16.8px" }}
                  className={`${classes.displayFlex} ${classes.color151875}`}
                >
                  {currency === 1 ? (
                    <React.Fragment>&#36;</React.Fragment> // dollar
                  ) : (
                    <React.Fragment>&#8377;</React.Fragment> // rupee
                  )}
                  {(32 * currency).toFixed(2)}
                </Typography>
              </span>
            </div>
          </div>
        </div>
      </section>
      <Divider />

      {/* trending products */}
      <section className={styles.trendingProducts}>
        <Typography
          variant="h2"
          className={classes.color151875}
          style={{ marginBottom: 38 }}
        >
          Trending Products
        </Typography>

        <Grid
          container
          columnGap="28px"
          rowGap="40px"
          className={styles.trendingProductsContainer}
        >
          {trendingProductsData.map((product, i) => {
            return (
              <NextLink
                key={i}
                href={`/products/${product.type[0]}/${product.id}`}
              >
                <Grid
                  item
                  className={`${classes.mainTrendingProduct} ${styles.mainTrendingProduct}`}
                >
                  <div className={styles.mainTrendingProductImage}>
                    <Image src={product.img} alt={product.title} />
                  </div>
                  <Typography
                    variant="body2"
                    style={{
                      lineHeight: "25.6px",
                      fontFamily: "lato",
                      fontWeight: 700,
                    }}
                    className={classes.color151875}
                  >
                    {product.title}
                  </Typography>
                  <span
                    className={`${classes.displayFlex} ${styles.mainTrendingProductPriceContainer}`}
                  >
                    <Typography
                      variant="caption"
                      style={{ fontFamily: "Josefin Sans" }}
                      className={`${classes.displayFlex} ${classes.color151875}`}
                    >
                      {currency === 1 ? (
                        <React.Fragment>&#36;</React.Fragment> // dollar
                      ) : (
                        <React.Fragment>&#8377;</React.Fragment> // rupee
                      )}
                      {(product.price * currency).toFixed(2)}
                    </Typography>
                    <Typography
                      variant="overline"
                      style={{
                        color: "#b9bad6",
                        lineHeight: "12px",
                        fontWeight: 400,
                        textDecoration: "line-through",
                      }}
                    >
                      ${(product.orignalPrice * currency).toFixed(2)}
                    </Typography>
                  </span>
                </Grid>
              </NextLink>
            );
          })}

          {trendingProductsOtherTrendingData.map((product, i) => {
            return (
              <Grid
                key={i}
                item
                className={`${styles.otherTrendingProduct} ${
                  styles["otherTrendingProduct" + i]
                }`}
              >
                <Typography
                  variant="h5"
                  style={{ fontSize: 26, lineHeight: "26px", marginBottom: 11 }}
                  className={classes.color151875}
                >
                  {product.title}
                </Typography>
                <NextLink href={product.goto}>
                  <Typography
                    variant="subtitle2"
                    color="secondary"
                    style={{ fontWeight: 600 }}
                  >
                    {product.link}
                  </Typography>
                </NextLink>
                <div
                  className={styles.otherTrendingProductImage}
                  style={product.imgStyle}
                >
                  <Image src={product.img} alt={product.title} />
                </div>
              </Grid>
            );
          })}

          <div className={styles.otherTrendingChairContainer}>
            {otherTrendingChairData.map((product, i) => {
              return (
                <NextLink
                  key={i}
                  href={`/products/${product.type[0]}/${product.id}`}
                >
                  <div key={i} className={styles.otherTrendingChair}>
                    <div className={styles.otherTrendingChairImage}>
                      <Image src={product.img} alt={product.title} />
                    </div>
                    <div className={styles.otherTrendingChairText}>
                      <Typography
                        variant="subtitle2"
                        style={{
                          lineHeight: "18.75px",
                          marginBottom: 5,
                          fontWeight: "bold",
                        }}
                        className={classes.color151875}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="overline"
                        style={{
                          textDecoration: "line-through",
                          lineHeight: "12px",
                          fontWeight: 400,
                        }}
                        className={`${classes.displayFlex} ${classes.color151875}`}
                      >
                        {currency === 1 ? (
                          <React.Fragment>&#36;</React.Fragment> // dollar
                        ) : (
                          <React.Fragment>&#8377;</React.Fragment> // rupee
                        )}
                        {(product.price * currency).toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                </NextLink>
              );
            })}
          </div>
        </Grid>
      </section>
      <Divider />

      {/* discount item section */}
      <section className={styles.discountItemMainContainer}>
        <Typography variant="h2" className={classes.color151875}>
          Discount Item
        </Typography>
        <div className={styles.discountItemInnerContainer}>
          <div className={styles.discountItemLinkContainer}>
            {discountItemLink.map((link, i) => {
              return (
                <Typography
                  key={i}
                  variant="body1"
                  className={classes.color151875}
                  style={{
                    color: discountItemActiveLink === link ? "#FB2E86" : "",
                    fontWeight: 400,
                  }}
                  onClick={() => {
                    setDiscountItemActiveLink(link);
                  }}
                >
                  {link}
                </Typography>
              );
            })}
          </div>

          {discountItemData.map((item) => {
            return (
              item.category === discountItemActiveLink && (
                <div key={item.id} className={styles.discountItem}>
                  <div className={styles.discountItemText}>
                    <Typography
                      variant="h4"
                      className={classes.color151875}
                      style={{
                        marginBottom: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {item.offer}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{
                        fontSize: 21,
                        lineHeight: "27.72px",
                        letterSpacing: "0.015em",
                        marginBottom: 20,
                      }}
                      color="secondary"
                    >
                      {item.productTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: 17,
                        fontFamily: "lato",
                        lineHeight: "30px",
                        fontWeight: 400,
                        marginBottom: 28,
                        color: "#B7BACB",
                      }}
                    >
                      {item.text}
                    </Typography>

                    <Grid
                      container
                      justifyContent="space-between"
                      rowGap="10px"
                      className={styles.discountItemFeatures}
                    >
                      {item.features.map((feature, i) => {
                        return (
                          <Grid
                            key={i}
                            item
                            className={styles.discountItemFeature}
                          >
                            <Tick />
                            <Typography
                              variant="body2"
                              style={{
                                lineHeight: "30px",
                                letterSpacing: "0.02em",
                                color: "#B8B8DC",
                                fontFamily: "lato",
                              }}
                            >
                              {feature}
                            </Typography>
                          </Grid>
                        );
                      })}
                    </Grid>

                    <NextLink href={item.link}>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{
                          width: 200,
                          height: 57,
                          textTransform: "capitalize",
                          borderRadius: 2,
                          fontSize: 17,
                          lineHeight: "20px",
                        }}
                        className={classes.btnEffect}
                        disableElevation
                      >
                        Shop Now
                      </Button>
                    </NextLink>
                  </div>
                  <div
                    className={styles.discountItemImage}
                    style={item.imgStyle}
                  >
                    <Image src={item.img} alt={item.productTitle} />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </section>
      <Divider />

      {/* top categories section */}
      <section className={styles.topCategories}>
        <Typography variant="h2" className={classes.color151875}>
          Top Categories
        </Typography>
        <Grid
          container
          columnGap="40px"
          className={styles.topCategoriesInnerContainer}
        >
          {topCategoriesItemData.map((product) => {
            return (
              product.categoryLink.includes(topCategoryActiveLink) && (
                <Grid key={product.id} item className={styles.topCategory}>
                  <div className={styles.topCategoryImageContainer}>
                    <div className={styles.topCategoryImage}>
                      <Image src={product.img} alt={product.title} />
                    </div>
                    <NextLink
                      href={`products/${product.type[0]}/${product.id}`}
                    >
                      <Button
                        variant="contained"
                        className={`${styles.topCategoryImageBtn} ${classes.greenBtn}`}
                        disableElevation
                      >
                        <Typography
                          variant="overline"
                          style={{
                            textTransform: "capitalize",
                            lineHeight: "12px",
                          }}
                        >
                          View Shop
                        </Typography>
                      </Button>
                    </NextLink>
                  </div>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontSize: 20,
                      lineHeight: "20px",
                      marginBottom: 13,
                    }}
                    className={classes.color151875}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ lineHeight: "16px", fontFamily: "Josefin Sans" }}
                    className={`${classes.displayFlex} ${classes.color151875}`}
                  >
                    {currency === 1 ? (
                      <React.Fragment>&#36;</React.Fragment> // dollar
                    ) : (
                      <React.Fragment>&#8377;</React.Fragment> // rupee
                    )}
                    {product.price * currency}
                  </Typography>
                </Grid>
              )
            );
          })}

          <div className={styles.topCategoryBtnContainer}>
            {topCategoryBtnData.map((btn, i) => {
              return (
                <span
                  key={i}
                  className={`${styles.topCategoryBtn} ${
                    topCategoryActiveLink === btn
                      ? styles.topCategoryActiveBtn
                      : ""
                  }`}
                  onClick={() => {
                    setTopCategoryActiveLink(btn);
                  }}
                />
              );
            })}
          </div>
        </Grid>
      </section>
      <Divider />
    </React.Fragment>
  );
};

export default Home;
