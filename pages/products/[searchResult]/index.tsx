import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../../../store/context/appContext";
const db = getFirestore();
import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import Header from "../../../components/partials/Header/Header";
import styles from "../../../styles/SearchResultPage.module.css";
import GridIcon from "../../../components/icons/GridIcon";
import Menu from "../../../components/icons/Menu";

import { storedData } from "../../../data/allData";
import Divider from "../../../components/partials/Divider/Divider";
import RowProduct from "../../../components/app/RowProduct/RowProduct";
import GridProduct from "../../../components/app/GridProduct/GridProduct";

import { getLocalUserData } from "../../../store/localUserData";

const useStyles = makeStyles((theme) => {
  return {
    color151875: {
      color: "#151875",
    },
    searchResultLength: {
      fontSize: 13,
      fontFamily: "lato",
      textTransform: "capitalize",
      fontWeight: "bold",
    },
    searchQueryHeading: {
      textTransform: "capitalize",
      [theme.breakpoints.down(500)]: {
        fontSize: 20,
      },
    },
    select: {
      fontSize: 16,
      marginRight: 4,
      "& > div": {
        padding: "0 !important",
        fontSize: 16,
        fontFamily: "Lato",
        fontWeight: 400,
        color: "#8A8FB9",
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
      padding: "5px 10px",
    },
    productFilterHeading: {
      fontSize: 20,
      lineHeight: "30px",
      fontWeight: 700,
      textDecoration: "underline",
      color: "#292C58",
    },
    checkboxFormControl: {
      width: "100%",
      height: 30,
      marginBottom: 3,
      "&> *": {
        color: "#989BB5",
        fontSize: 15,
        lineHeight: "30px",
        fontFamily: "lato",
        fontWeight: 400,
        "& > *": {
          "& > svg": {
            width: 20,
            height: 20,
          },
        },
      },
    },
  };
});

let isInitial = true;

export default function ProductsList() {
  const classes = useStyles();
  const router = useRouter();
  const { userInfo, setCartItemCtx, isUserLoggedIn } = useAppContext();
  const [page, setPage] = useState(1);
  const [viewType, setViewType] = useState("row");
  const [userCartState, setUserCartState] = useState([]);
  const [userWishlistState, setUserWishlistState] = useState([]);
  const [width, setWidth] = useState(0); // default width, detect on server.

  const query = router.query.searchResult;
  const searchQuery = query && query.toString().replace(/-/g, " ");

  const filteredData = storedData.filter((data) =>
    data.type.includes(`${searchQuery}`)
  );

  /**
   * handling page when viewtype changes
   */
  const pageCount = Math.ceil(
    filteredData.length / (viewType === "row" ? 10 : 12)
  );

  //////////// useEffects
  /**
   * getting page width
   */

  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    width > 0 && width <= 650 && setViewType("grid");
  }, [width]);

  /**
   * handling smooth scrolling
   */
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    document.getElementById("searchControlInfoContainer") &&
      document
        .getElementById("searchControlInfoContainer")
        .scrollIntoView({ behavior: "smooth" });
  }, [page]);

  /**
   * setting page whenever pagecount changes
   */
  useEffect(() => {
    if (pageCount && pageCount < page) {
      setPage(pageCount);
    }
  }, [pageCount]);

  /**
   * fetching user cart info
   */

  useEffect(() => {
    if (!isUserLoggedIn) {
      const localUserData = getLocalUserData();
      setUserCartState(localUserData.cart);
      setUserWishlistState(localUserData.wishlist);

      return;
    }
    const getUserData = async () => {
      const docRef = doc(db, "users", userInfo && userInfo.docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserCartState(data.cart ? data.cart : []);
        setUserWishlistState(data.wishlist ? data.wishlist : []);
      } else {
        setUserCartState([]);
        setUserWishlistState([]);
      }
    };
    getUserData();
  }, [isUserLoggedIn]);

  /////////////// function handlers

  const pageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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

  const toggleCartHandler = (id: number) => {
    if (userCartState.includes(id)) {
      const updatedCart = userCartState.filter((ids) => ids !== id);
      setUserCartState(updatedCart);
      sendCartData(updatedCart);
    } else {
      const data = [...userCartState, id];
      sendCartData(data);
      setUserCartState((prevId) => (prevId ? [...prevId, id] : [id]));
    }
  };

  const toggleWishlistHandler = (id: number) => {
    if (userWishlistState.includes(id)) {
      const updatedWishlist = userWishlistState.filter((ids) => ids !== id);
      setUserWishlistState(updatedWishlist);
      sendWishlistData(updatedWishlist);
    } else {
      sendWishlistData([...userWishlistState, id]);
      setUserWishlistState((prevId) => (prevId ? [...prevId, id] : [id]));
    }
  };

  const headerText =
    filteredData && filteredData.length > 0 ? "Shop List" : "No Result Found";
  return (
    <React.Fragment>
      <Header heading={headerText} path={headerText.replace(/\s/g, "-")} />

      {filteredData && filteredData.length > 0 ? (
        <React.Fragment>
          {/** search control and information container  **/}
          <section
            id="searchControlInfoContainer"
            className={styles.searchControlInfoContainer}
          >
            <div className={styles.searchControlInfoInnerContainer}>
              <div className={styles.searchInfo}>
                <Typography
                  variant="h6"
                  className={`${classes.searchQueryHeading} ${classes.color151875}`}
                >
                  {`${searchQuery} Search Result`}
                </Typography>
                <Typography
                  variant="overline"
                  className={classes.searchResultLength}
                  color="secondary"
                >
                  About {filteredData.length} results
                  {width < 500 && (
                    <span className={styles.lintText}>
                      {viewType === "row"
                        ? " / per-page: 10"
                        : " / per-page: 12"}
                    </span>
                  )}
                </Typography>
              </div>
              {/* result per page */}
              {width > 500 && (
                <span
                  style={{ marginRight: 27 }}
                  className={styles.displayflex}
                >
                  <Typography
                    variant="subtitle2"
                    style={{ color: "#3F509E", marginRight: 8 }}
                  >
                    Per Page:
                  </Typography>
                  <input
                    className={styles.input}
                    style={{ width: 55, height: 25 }}
                    value={viewType === "row" ? "10" : "12"}
                    readOnly
                  />
                </span>
              )}

              {width > 0 && width > 650 && (
                <span className={styles.displayflex}>
                  <Typography variant="subtitle2" style={{ color: "#3F509E" }}>
                    View:
                  </Typography>
                  <span className={styles.searchControlViewIconContainer}>
                    <span
                      className={styles.displayflex}
                      onClick={() => {
                        setViewType("grid");
                      }}
                    >
                      <GridIcon />
                    </span>
                    <span
                      className={styles.displayflex}
                      onClick={() => {
                        setViewType("row");
                      }}
                    >
                      <Menu />
                    </span>
                  </span>
                  <input
                    className={styles.input}
                    value={viewType}
                    readOnly
                    style={{
                      width: 162,
                      height: 30,
                      textTransform: "capitalize",
                    }}
                  />
                </span>
              )}
            </div>
          </section>
          {/* search result container */}
          <section className={styles.searchResultsContainer}>
            {/* sidebar */}
            <Grid
              columnGap="53px"
              rowGap={viewType === "row" ? "28px" : "80px"}
              container
              justifyContent="center"
              className={styles.searchResultsInnerContainer}
            >
              {viewType === "row" &&
                filteredData
                  .slice((page - 1) * 10, page * 10)
                  .map((product) => {
                    return (
                      <RowProduct
                        key={product.id}
                        product={product}
                        href={`${searchQuery}/${product.id}`}
                        toggleCartHandler={toggleCartHandler}
                        toggleWishlistHandler={toggleWishlistHandler}
                        userCartState={userCartState}
                        userWishlistState={userWishlistState}
                      />
                    );
                  })}
              {viewType === "grid" &&
                filteredData
                  .slice((page - 1) * 12, page * 12)
                  .map((product) => {
                    return (
                      <GridProduct
                        key={product.id}
                        product={product}
                        href={`${searchQuery}/${product.id}`}
                        toggleCartHandler={toggleCartHandler}
                        toggleWishlistHandler={toggleWishlistHandler}
                        userCartState={userCartState}
                        userWishlistState={userWishlistState}
                        showIcons={true}
                      />
                    );
                  })}
            </Grid>

            {pageCount > 1 && (
              <div className={styles.paginationContainer}>
                <Pagination
                  count={pageCount}
                  variant="outlined"
                  className={styles.pagination}
                  page={page}
                  onChange={pageChangeHandler}
                />
              </div>
            )}
          </section>
        </React.Fragment>
      ) : (
        <Typography
          style={{ textAlign: "center", margin: "10rem" }}
          variant="h3"
        >
          No Search Result Found !!
        </Typography>
      )}
      <Divider />
    </React.Fragment>
  );
}
