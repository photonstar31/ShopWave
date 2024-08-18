import React, { useState, useEffect } from "react";
import Header from "../components/partials/Header/Header";
import styles from "../styles/Cart.module.css";
import { Card, Grid } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Typography, makeStyles, TextField, Button } from "@material-ui/core";
import CloseIcon from "../components/icons/CloseIcon";
import { storedData } from "../data/allData";
import Image from "next/image";
import NextLink from "next/link";
import lodash from "lodash";
import Modal from "../components/partials/Modal/Modal";
import Divider from "../components/partials/Divider/Divider";
import { useAppContext } from "../store/context/appContext";
import Loading from "../components/partials/Loading/Loading";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import NoItemFound from "../components/partials/NoItemFound/NoItemFound";
import { getLocalUserData } from "../store/localUserData";
import { useRouter } from "next/dist/client/router";

const db = getFirestore();

const useStyles = makeStyles({
  cartProductHeading: {
    fontSize: 20,
    lineHeight: "23.44px",
    color: "#1D3178",
    fontFamily: "Josefin Sans",
  },
  productText: {
    lineHeight: "16.41px",
    fontFamily: "Josefin Sans",
  },
  color15245E: {
    color: "#15245E",
  },
  color1D3178: {
    color: "#1D3178",
  },
  textField: {
    minWidth: 30,
    maxWidth: 30,
    maxHeight: 15,
    minHeight: 15,
    "& > div": {
      borderRadius: 2,
    },
    "& > * input": {
      padding: 0,
      fontWeight: 300,
      fontSize: 13,
      textAlign: "center",
    },
  },
  productCard: {
    borderRadius: 1,
  },
  productPrice: {
    width: 100,
    textAlign: "center",
    marginRight: 88,
  },
  cartProducttotalPrice: {
    width: 80,
    marginLeft: "auto",
    // marginRight: "auto",
    textAlign: "center",
  },
  productTitle: {
    cursor: "pointer",
    textTransform: "capitalize",
    fontWeight: 600,
    transition: "all .3s",
    "&:hover": {
      color: "#15245E",
    },
  },
  checkoutBtn: {
    backgroundColor: "#19D16F",
    borderRadius: 3,
    width: 312,
    height: 40,
    transition: "all .2s",
    "&:hover": {
      backgroundColor: "#0BC461",
    },
  },
  btnEffect: {
    "&:hover": {
      boxShadow: "1px 5px 5px rgba(0,0,0,.12)",
    },

    "&:active": {
      boxShadow: "none",
    },
  },
  checkoutBtnText: {
    color: "#fff",
    lineHeight: "16.8px",
    textTransform: "capitalize",
    fontWeight: 700,
  },
  cartTotalPrice: {
    fontWeight: 700,
  },
  clearCartBtn: {
    borderRadius: 3,
    width: 312,
    height: 40,
    marginTop: 60,
  },
  clearCartBtnText: {
    fontFamily: "Josefin Sans",
    textTransform: "capitalize",
  },
  noCartFoundHeading: {
    fontSize: 26,
    fontWeight: 400,
  },
  quantityIcon: {
    width: 15,
    height: 15,
    cursor: "pointer",
    backgroundColor: "#BEBFC2",
    transition: "all .2s",
    "&:hover": {
      backgroundColor: "#c5c6c9",
    },
  },
});

let isInitial = true;

const Cart = () => {
  const classes = useStyles();
  const router = useRouter();
  const {
    userInfo,
    setCartItemCtx,
    cartItemCtx,
    isUserLoggedIn,
    accountLoading,
    currencyType,
  } = useAppContext();
  const heading = ["Product", "Price", "Quantity", "Total"];
  const [priceState, setPriceState] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [cartItemContainer, setCartItemContainer] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [currency, setCurrency] = useState(75);

  /**
   * managing price whenevery currency type changes
   */
  useEffect(() => {
    setCurrency(currencyType === "usd" ? 1 : 75);
  }, [currencyType]);

  /*
   *managing user cart ids
   */
  useEffect(() => {
    if (!isUserLoggedIn) {
      /// get user cart items from localstorage
      const localUserData = getLocalUserData();
      setCartId(localUserData.cart);

      return;
    }

    const getUserData = () => {
      cartItemCtx ? setCartId(cartItemCtx) : setCartId([]);
    };
    getUserData();
  }, [cartItemCtx]);

  /**
   * filtering cart item and getting quantity
   */
  useEffect(() => {
    const filterCart = (a) => {
      const counts = {};

      for (let i = 0; i < a.length; i++) {
        if (counts[a[i]]) {
          counts[a[i]] += 1;
        } else {
          counts[a[i]] = 1;
        }
      }
      const transformedData = Object.keys(counts).map((key) => {
        return {
          id: key,
          quantity: counts[key],
        };
      });

      setCartItemContainer(transformedData);
    };

    filterCart(cartId);
  }, [cartId]);

  /**
   * calc discount and discount price
   */
  const discount =
    Math.ceil(Math.random() * 4 * cartItemContainer.length) / 100;
  const discountPrice =
    discount > 0 ? (priceState * discount).toFixed(2) : (priceState * 14) / 100;

  console.log(discount);

  const price = [];

  /**
   * filtering data by mapping cartItemContainer
   */
  const filteredData =
    cartItemContainer &&
    cartItemContainer.map((cart) => {
      return storedData
        .filter((product) => {
          product.id === +cart.id && price.push(product.price * cart.quantity);
          return product.id === +cart.id;
        })
        .pop();
    });

  /**
   * updating price whenever cartItemContainer changes
   */
  useEffect(() => {
    const totalPrice = lodash.sum(price);
    setPriceState(totalPrice * currency);
  }, [cartItemContainer, currency]);

  /**
   * deleting item form the cart
   */
  const deleteCartHandler = (id: number) => {
    const updatedCartItemContainer = cartId.filter((cartId) => cartId !== id);
    setCartId(updatedCartItemContainer);
    setCartItemCtx(updatedCartItemContainer);
    if (!isUserLoggedIn) {
      //// setting cart item to localstorage if the user is not login
      localStorage.setItem("cart", `${updatedCartItemContainer}`);
    }
  };

  /**
   * showing modal when click on clear cart
   */
  const showModalHandler = () => {
    setShowModal(true);
  };
  /**
   * clearing user cart, when user clicked clear cart.
   */
  const modalProceedHandler = () => {
    setShowModal(false);
    setCartId([]);
    setCartItemCtx([]);
    localStorage.setItem("cart", "");
  };

  /**
   * decreasing cart item handler
   */
  const decreaseCartItemHandler = (id: number) => {
    const array = [...cartId]; // make a separate copy of the array
    const index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      setCartId(array);
      setCartItemCtx(array);
      if (!isUserLoggedIn) {
        //// setting cart item to localstorage if the user is not login
        localStorage.setItem("cart", `${array}`);
      }
    }
  };

  /**
   *  increasing cart item
   */
  const increaseCartItemHandler = (id: number) => {
    const quantity = cartId.filter((cartId) => cartId === id);

    if (quantity.length >= 8) {
      return;
    }
    if (!isUserLoggedIn) {
      //// setting cart item to localstorage if the user is not login
      localStorage.setItem("cart", `${[...cartId, id]}`);
    }
    setCartItemCtx([...cartId, id]);
    setCartId((prevState) => [...prevState, id]);
  };

  /**
   *  updating cartId whenever cartId state changes
   */
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (!isUserLoggedIn) {
      return;
    }
    const updateCartData = async () => {
      const userRef = doc(db, "users", userInfo.docId);
      await updateDoc(userRef, {
        cart: cartId,
      });
    };
    updateCartData();
    // setCartItemCtx(cartId);
  }, [cartId]);

  const proceedToCheckoutHandler = () => {
    if (!isUserLoggedIn) {
      router.push("/login");
      return;
    }
    router.push("/details-confirmation");
  };

  return (
    <React.Fragment>
      <Header heading="Shopping Cart" path="shopping cart" />
      {showModal && (
        <Modal
          message="Are you sure you want to clear your cart?"
          btnOkText="Clear Cart"
          btnCancelText="Cancel"
          proceedHandler={modalProceedHandler}
          cancelHandler={() => {
            setShowModal(false);
          }}
        />
      )}
      <section className={styles.cart}>
        {accountLoading ? (
          <Loading width={50} color={"#0d0d0d"} />
        ) : cartItemContainer.length > 0 ? (
          <Grid
            container
            justifyContent="space-between"
            className={styles.cartInnerContainer}
          >
            <Grid item className={styles.cartProductsContainer}>
              <div className={styles.cartProductsHeadingContainer}>
                {heading.map((heading, i) => {
                  return (
                    <Typography
                      key={i}
                      variant="body1"
                      className={classes.cartProductHeading}
                    >
                      {heading}
                    </Typography>
                  );
                })}
              </div>

              <div className={styles.cartProducts}>
                {filteredData.map((product, i) => {
                  return (
                    <Card
                      className={`${classes.productCard} ${styles.cartProduct}`}
                      key={i}
                    >
                      <span
                        className={styles.productCloseIcon}
                        onClick={() => {
                          deleteCartHandler(product.id);
                        }}
                      >
                        <CloseIcon />
                      </span>
                      <div className={styles.cartProductImgAndTitle}>
                        <div className={styles.cartProductImage}>
                          <Image src={product.img} />
                        </div>

                        <NextLink
                          href={`/products/${product.type[0]}/${product.id}`}
                        >
                          <Typography
                            variant="caption"
                            className={`${classes.productTitle} ${classes.productText}`}
                          >
                            {product.title}
                          </Typography>
                        </NextLink>
                      </div>

                      <Typography
                        variant="caption"
                        className={`${classes.productPrice} ${classes.productText} ${classes.color15245E}`}
                      >
                        {currency === 1 ? (
                          <React.Fragment>&#36;</React.Fragment> // dollar
                        ) : (
                          <React.Fragment>&#8377;</React.Fragment> // rupee
                        )}
                        {(product.price * currency).toFixed(2)}
                      </Typography>
                      <span className={styles.displayFlexSb}>
                        <Remove
                          className={classes.quantityIcon}
                          onClick={() => {
                            decreaseCartItemHandler(product.id);
                          }}
                        />
                        <TextField
                          variant="outlined"
                          value={cartItemContainer[i].quantity}
                          className={classes.textField}
                        />
                        <Add
                          className={classes.quantityIcon}
                          onClick={() => {
                            increaseCartItemHandler(product.id);
                          }}
                        />
                      </span>

                      <Typography
                        variant="caption"
                        className={`${classes.cartProducttotalPrice} ${classes.color15245E} ${classes.productText}`}
                      >
                        {currency === 1 ? (
                          <React.Fragment>&#36;</React.Fragment> // dollar
                        ) : (
                          <React.Fragment>&#8377;</React.Fragment> // rupee
                        )}
                        {(
                          cartItemContainer[i].quantity *
                          product.price *
                          currency
                        ).toFixed(2)}
                      </Typography>
                    </Card>
                  );
                })}
              </div>
            </Grid>
            <Grid item className={styles.cartProductsTotal}>
              <Typography
                variant="body1"
                className={classes.cartProductHeading}
              >
                Cart Total
              </Typography>

              <div className={styles.cartProductsTotalInnerContainer}>
                <span
                  className={`${styles.cartTextBorderbottom} ${styles.displayFlexSb}`}
                >
                  <Typography
                    variant="body1"
                    className={classes.color1D3178}
                    style={{ fontWeight: 500 }}
                  >
                    Price
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className={classes.color15245E}
                    style={{ fontWeight: 500 }}
                  >
                    {currency === 1 ? (
                      <React.Fragment>&#36;</React.Fragment> // dollar
                    ) : (
                      <React.Fragment>&#8377;</React.Fragment> // rupee
                    )}
                    {priceState.toFixed(2)}
                  </Typography>
                </span>

                <span
                  className={`${styles.cartTextBorderbottom} ${styles.displayFlexSb}`}
                >
                  <Typography
                    variant="body1"
                    className={classes.color1D3178}
                    style={{ fontWeight: 500 }}
                  >
                    Discount
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ fontWeight: 500, color: "#11AE59" }}
                  >
                    -
                    {currency === 1 ? (
                      <React.Fragment>&#36;</React.Fragment> // dollar
                    ) : (
                      <React.Fragment>&#8377;</React.Fragment> // rupee
                    )}
                    {discountPrice}
                  </Typography>
                </span>

                <span
                  className={`${styles.cartTextBorderbottom} ${styles.displayFlexSb}`}
                >
                  <Typography
                    variant="body1"
                    className={classes.color1D3178}
                    style={{ fontWeight: 500 }}
                  >
                    Delivery Charges
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ fontWeight: 500, color: "#11AE59" }}
                  >
                    FREE
                  </Typography>
                </span>

                <span
                  className={`${styles.cartTotalBorderbottom} ${styles.displayFlexSb}`}
                >
                  <Typography
                    variant="body1"
                    className={classes.color1D3178}
                    style={{ fontWeight: 600 }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className={`${classes.cartTotalPrice} ${classes.color1D3178}`}
                  >
                    {currency === 1 ? (
                      <React.Fragment>&#36;</React.Fragment> // dollar
                    ) : (
                      <React.Fragment>&#8377;</React.Fragment> // rupee
                    )}
                    {(priceState - +discountPrice).toFixed(2)}
                  </Typography>
                </span>

                <Button
                  variant="contained"
                  className={`${classes.btnEffect} ${classes.checkoutBtn}`}
                  disableElevation
                  onClick={proceedToCheckoutHandler}
                >
                  <Typography
                    variant="caption"
                    className={classes.checkoutBtnText}
                  >
                    proceed to checkout
                  </Typography>
                </Button>
              </div>

              <Button
                variant="contained"
                className={`${classes.clearCartBtn} ${classes.btnEffect}`}
                disableElevation
                color="secondary"
                onClick={showModalHandler}
              >
                <Typography
                  variant="subtitle2"
                  className={classes.clearCartBtnText}
                >
                  Clear Cart
                </Typography>
              </Button>
            </Grid>
          </Grid>
        ) : (
          <NoItemFound
            text="Your Cart Is Empty!"
            message="Add item to it now."
            btnText="shop now"
            btnLink="/products"
          />
        )}
      </section>

      <Divider />
    </React.Fragment>
  );
};

export default Cart;
