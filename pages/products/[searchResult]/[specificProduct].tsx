import React, { useState, useEffect } from "react";
import styles from "../../../styles/SpecificProduct.module.css";
import Header from "../../../components/partials/Header/Header";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { Typography, makeStyles, Button } from "@material-ui/core";
import { specificItem } from "../../../data/allData";

import ArrowRight from "../../../components/icons/ArrowRight";
import Facebook from "../../../components/icons/Facebook";
import Heart from "../../../components/icons/Heart";
import Instagram from "../../../components/icons/Instagram";
import Star from "../../../components/icons/Star";
import Twitter from "../../../components/icons/Twitter";

import { Favorite } from "@mui/icons-material";
import Divider from "../../../components/partials/Divider/Divider";
import { useAppContext } from "../../../store/context/appContext";
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import Loading from "../../../components/partials/Loading/Loading";
import { getLocalUserData } from "../../../store/localUserData";

const db = getFirestore();

const specificProductDetailsData = [
  {
    type: "Description",
    heading: "various tempor",
    text: "Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .",
    moreDetailsHeading: "More details",
    features: [
      "Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .",
      "Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .",
      "Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .",
      "Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .",
    ],
  },
  {
    type: "Additional Info",
    heading: "Additional Detail",
    text: "Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr Eu in fringilla vulputate nunc nec. Dui, massa viverr .",
    moreDetailsHeading: "Features",
    features: [
      "Made with high quality product.",
      "3 year warranty against manufacturing defect's.",
      "Cancellation NOT allowed for this product after 24 hrs of order booking.",
      "DIY - Basic assembly to be done with simple tools by the customer, comes with instructions.",
      "10 Days Replacement Policy.",
    ],
  },
  {
    type: "Review",
    heading: "Reviews",
    text: "Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .",
    moreDetailsHeading: "Features",
    features: [
      "Made with high quality product.",
      "3 year warranty against manufacturing defect's.",
      "Cancellation NOT allowed for this product after 24 hrs of order booking.",
      "DIY - Basic assembly to be done with simple tools by the customer, comes with instructions.",
      "10 Days Replacement Policy.",
    ],
  },
];

const useStyles = makeStyles({
  color0D134E: {
    color: "#0D134E",
  },
  color151875: {
    color: "#151875",
  },
  colorA9ACC6: {
    color: "#A9ACC6",
  },
  filledHeartIcon: {
    transform: "scale(1.15)",
  },
  addToCartBtn: {
    textTransform: "capitalize",
    minWidth: 110,
    minHeight: 36,
  },
});

const SpecificProduct = () => {
  const {
    userInfo,
    accountLoading,
    setCartItemCtx,
    isUserLoggedIn,
    currencyType,
  } = useAppContext();
  const classes = useStyles();
  const router = useRouter();
  const productType = `${router.query.searchResult}`;
  const productId = +router.query.specificProduct;
  const [userCartItem, setUserCartItem] = useState([]);
  const [userWishlistItem, setUserWishlistItem] = useState([]);
  const [currency, setCurrency] = useState(75);

  /**
   * managing price whenevery currency type changes
   */
  useEffect(() => {
    setCurrency(currencyType === "usd" ? 1 : 75);
  }, [currencyType]);

  /**
   * setting user cart info
   * */
  useEffect(() => {
    if (!isUserLoggedIn) {
      const localUserData = getLocalUserData();
      setUserCartItem(localUserData.cart);
      setUserWishlistItem(localUserData.wishlist);
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
        setUserCartItem(data.cart ? data.cart : []);
        setUserWishlistItem(data.wishlist ? data.wishlist : []);
      } else {
        setUserCartItem([]);
        setUserWishlistItem([]);
      }
    };
    getUserData();
  }, [isUserLoggedIn, accountLoading]);

  const product = specificItem(productId, productType);
  const [productDetailsActiveLink, setProductDetailsActiveLink] =
    useState("Description");

  const stars = [1, 2, 3, 4, 5];
  const productDetailsLinks = [
    "Description",
    "Additional Info",
    "Reviews",
    "Video",
  ];

  /**
   * function for sending cart data
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

  /**
   * function for sending wishlist data
   */
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

  const addToCartHandler = (id: number) => {
    const updateCartItem =
      userCartItem.length > 0 ? [...userCartItem, id] : [id];
    sendCartData(updateCartItem);
    setUserCartItem((prevId) => (prevId ? [...prevId, id] : [id]));
  };

  const toggleWishlistHandler = (id: number) => {
    if (userWishlistItem.includes(id)) {
      const updatedWishlist = userWishlistItem.filter((ids) => ids !== id);
      setUserWishlistItem(updatedWishlist);
      sendWishlistData(updatedWishlist);
    } else {
      const data =
        userWishlistItem.length > 0 ? [...userWishlistItem, id] : [id];
      sendWishlistData(data);
      setUserWishlistItem((prevId) => (prevId ? [...prevId, id] : [id]));
    }
  };

  return (
    <React.Fragment>
      <Header
        heading={product ? "Product Details" : "Page 404"}
        path={product ? "Product Details" : "Page 404"}
      />

      {product ? (
        <React.Fragment>
          <section className={styles.specificProduct}>
            <div className={styles.specificProductInnerContainer}>
              {product && (
                <React.Fragment>
                  <div className={styles.specificProductImagesContainer}>
                    <Image src={product.img} alt={product.title} />
                  </div>
                  <div className={styles.specificProductTextContainer}>
                    <Typography
                      style={{ textTransform: "capitalize" }}
                      variant="h3"
                      className={classes.color0D134E}
                    >
                      {product.title}
                    </Typography>
                    <div className={styles.specificProductStarContainer}>
                      {stars.map((star) => {
                        return (
                          <Star
                            key={star}
                            color={
                              star <= product.rating ? "#FFC416" : "#B2B2B2"
                            }
                          />
                        );
                      })}
                      <Typography
                        variant="caption"
                        style={{ lineHeight: "29px", marginLeft: 5 }}
                      >
                        (22)
                      </Typography>
                    </div>

                    <div className={styles.specificProductPriceContainer}>
                      <Typography
                        variant="body2"
                        style={{ fontFamily: "Josefin Sans" }}
                        className={classes.color151875}
                      >
                        {currency === 1 ? (
                          <React.Fragment>&#36;</React.Fragment> // dollar
                        ) : (
                          <React.Fragment>&#8377;</React.Fragment> // rupee
                        )}
                        {product.price * currency}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Josefin Sans",
                          textDecoration: "line-through",
                        }}
                        color="secondary"
                      >
                        {currency === 1 ? (
                          <React.Fragment>&#36;</React.Fragment> // dollar
                        ) : (
                          <React.Fragment>&#8377;</React.Fragment> // rupee
                        )}
                        {product.orignalPrice * currency}
                      </Typography>
                    </div>

                    <Typography
                      variant="body2"
                      style={{ color: "#A9ACC6", fontFamily: "Josefin Sans" }}
                    >
                      {product.text}
                    </Typography>

                    <div className={styles.addToCartContainer}>
                      <Button
                        variant="contained"
                        className={classes.addToCartBtn}
                        color="secondary"
                        disableElevation
                        onClick={() => {
                          if (userCartItem.includes(product.id)) {
                            router.push("/cart");
                            return;
                          }
                          addToCartHandler(product.id);
                        }}
                      >
                        {accountLoading ? (
                          <Loading width={18} color="#f1f1f1" />
                        ) : userCartItem.includes(product.id) ? (
                          "Go To Cart"
                        ) : (
                          "Add To Cart"
                        )}
                      </Button>
                      <span
                        className={styles.heartSvg}
                        onClick={() => {
                          toggleWishlistHandler(product.id);
                        }}
                      >
                        {userWishlistItem.includes(product.id) ? (
                          <Favorite
                            color="secondary"
                            className={classes.filledHeartIcon}
                          />
                        ) : (
                          <Heart />
                        )}
                      </span>
                    </div>

                    <Typography
                      className={classes.color151875}
                      variant="body2"
                      style={{
                        fontFamily: "Josefin Sans",
                        marginBottom: 10,
                        textTransform: "capitalize",
                      }}
                    >
                      Categories: {router.query.searchResult}
                    </Typography>

                    <Typography
                      className={classes.color151875}
                      variant="body2"
                      style={{
                        fontFamily: "Josefin Sans",
                        marginBottom: 10,
                        textTransform: "capitalize",
                      }}
                    >
                      Tag: {`${product.type[0]}, ${product.type[1]}`}
                    </Typography>

                    <div className={styles.specificProductShareContainer}>
                      <Typography
                        className={classes.color151875}
                        variant="body2"
                        style={{ fontFamily: "Josefin Sans", marginRight: 16 }}
                      >
                        Share
                      </Typography>
                      <span className={styles.shareIcon}>
                        <Facebook />
                      </span>
                      <span className={styles.shareIcon}>
                        <Instagram />
                      </span>
                      <span className={styles.shareIcon}>
                        <Twitter />
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </section>
          <Divider />

          {/* product details */}
          <section className={styles.productDetails}>
            <div className={styles.productDetailsInnerContainer}>
              <div className={styles.productDetailsLinkContainer}>
                {productDetailsLinks.map((link) => {
                  return (
                    <Typography
                      key={link}
                      onClick={() => {
                        setProductDetailsActiveLink(link);
                      }}
                      variant="body2"
                      className={classes.color151875}
                      style={{
                        fontSize: 24,
                        cursor: "pointer",
                        textDecorationLine:
                          productDetailsActiveLink === link ? "underline" : "",
                      }}
                    >
                      {link}
                    </Typography>
                  );
                })}
              </div>

              <div className={styles.productDetailsInformationContainer}>
                {specificProductDetailsData.map((product, i) => {
                  return (
                    product.type === productDetailsActiveLink && (
                      <div key={i} className={styles.productDetailsInformation}>
                        <Typography
                          variant="h6"
                          className={classes.color151875}
                          style={{ marginBottom: 14 }}
                        >
                          {product.heading}
                        </Typography>

                        <Typography
                          variant="body2"
                          className={classes.colorA9ACC6}
                          style={{ marginBottom: 36 }}
                        >
                          {product.text}
                        </Typography>

                        <Typography
                          variant="h6"
                          className={classes.color151875}
                          style={{ marginBottom: 16 }}
                        >
                          {product.moreDetailsHeading}
                        </Typography>

                        <div className={styles.productDetailsFeatureContainer}>
                          {product.features.map((feature, i) => {
                            return (
                              <span
                                key={i}
                                className={styles.productDetailsFeature}
                              >
                                <span className={styles.productDetailsIcon}>
                                  <ArrowRight />
                                </span>
                                <Typography
                                  variant="body2"
                                  className={classes.colorA9ACC6}
                                >
                                  {feature}
                                </Typography>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </section>
        </React.Fragment>
      ) : (
        <h1 style={{ textAlign: "center", margin: "10rem 0" }}>
          404 | page not found
        </h1>
      )}
    </React.Fragment>
  );
};

export default SpecificProduct;
