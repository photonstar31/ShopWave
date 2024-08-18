import React, { useEffect, useState } from "react";
import Header from "../components/partials/Header/Header";
import styles from "../styles/Wishlist.module.css";
import Image from "next/image";
import NextLink from "next/link";

import { Typography, makeStyles, Card, Button } from "@material-ui/core";
import { Delete } from "@mui/icons-material";

import { useAppContext } from "../store/context/appContext";

import Star from "../components/icons/Star";
import { doc, getFirestore, updateDoc, getDoc } from "firebase/firestore";
import { storedData } from "../data/allData";
import Divider from "../components/partials/Divider/Divider";

import Loading from "../components/partials/Loading/Loading";
import Modal from "../components/partials/Modal/Modal";
import NoItemFound from "../components/partials/NoItemFound/NoItemFound";
import { getLocalUserData } from "../store/localUserData";

const db = getFirestore();

const useStyles = makeStyles({
  productTitle: {
    fontWeight: 600,
    cursor: "pointer",
    transition: "all .1s",
    "&:hover": {
      color: "#15245E",
    },
  },
  deleteSvg: {
    fill: "#d9d6d6",
    cursor: "pointer",
    transition: "all .3s",
    "&:hover": {
      fill: "#ababab",
    },
  },
  originalPrice: {
    textDecoration: "line-through",
  },
  fontWeight: {
    fontWeight: 600,
  },
  card: {
    // boxShadow: "0px 1px 2px rgba(0,0,0,.09)",
    borderBottom: "2px solid rgba(0,0,0,.1)",
    transition: "all .25s",
    "&:hover": {
      // borderBottomColor: "transparent",
      // boxShadow: "1px 3px 5px rgba(0,0,0,.13)",
    },
  },
  clearWishlistBtn: {
    marginTop: 15,
    display: "block",
    width: 135,
    height: 40,
    padding: 0,
    textTransform: "capitalize",
    marginLeft: "auto",
  },
});

export default function wishlist() {
  const classes = useStyles();
  const { userInfo, isUserLoggedIn, accountLoading } = useAppContext();
  const [wishlist, setWishlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  ////// setting user wishlist
  useEffect(() => {
    if (accountLoading) {
      return;
    }

    if (!isUserLoggedIn) {
      /// get user wishlist items from localstorage
      const localUserData = getLocalUserData();
      setWishlist(localUserData.wishlist);
      setIsLoading(false);
      return;
    }

    const getUserData = async () => {
      const docRef = doc(db, "users", userInfo && userInfo.docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWishlist(data.wishlist ? data.wishlist : []);
        setIsLoading(false);
      } else {
        // no data found
        setIsLoading(false);
      }
    };
    getUserData();
  }, [isUserLoggedIn, accountLoading]);

  const stars = [1, 2, 3, 4, 5];
  const filteredData =
    wishlist.length > 0 &&
    wishlist.map((id) => {
      return storedData
        .filter((product) => {
          return product.id === id;
        })
        .pop();
    });

  const deleteWishlistHandler = (id: number) => {
    const updatedWishlist = wishlist.filter((ids) => {
      return ids !== id;
    });
    setWishlist(updatedWishlist);

    if (!isUserLoggedIn) {
      localStorage.setItem("wishlist", `${updatedWishlist}`);
      return;
    }

    const updateUserData = async () => {
      const userRef = doc(db, "users", userInfo.docId);
      await updateDoc(userRef, {
        wishlist: updatedWishlist,
      });
    };
    updateUserData();
  };

  const modalProceedHandler = () => {
    setShowModal(false);
    setWishlist([]);

    if (!isUserLoggedIn) {
      localStorage.setItem("wishlist", "");
      return;
    }
    const updateUserData = async () => {
      const userRef = doc(db, "users", userInfo.docId);
      await updateDoc(userRef, {
        wishlist: [],
      });
    };
    updateUserData();
  };
  const modalCancelHandler = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Header heading="Wishlist" path="wishlist" />

      {showModal && (
        <Modal
          message="are you sure you want to clear your wishlist?"
          btnOkText="clear wishlist"
          btnCancelText="cancel"
          proceedHandler={modalProceedHandler}
          cancelHandler={modalCancelHandler}
        />
      )}

      <section className={styles.wishlist}>
        {isLoading ? (
          <Loading width={50} color="#0d0d0d" />
        ) : wishlist.length > 0 ? (
          <Card className={styles.innerContainer}>
            {filteredData &&
              filteredData.map((product) => {
                return (
                  <div
                    key={product.id}
                    className={`${classes.card} ${styles.wishlistProduct}`}
                  >
                    <div className={styles.wishlistProductImage}>
                      <Image src={product.img} alt={product.title} />
                    </div>
                    <div className={styles.wishlistProductText}>
                      <NextLink
                        href={`/products/${product.type[0]}/${product.id}`}
                      >
                        <Typography
                          variant="subtitle2"
                          className={classes.productTitle}
                        >
                          {product.title}
                        </Typography>
                      </NextLink>

                      <span>
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
                      </span>

                      <div className={styles.priceContainer}>
                        <Typography
                          variant="caption"
                          className={classes.fontWeight}
                        >
                          ${product.price}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="secondary"
                          className={`${classes.fontWeight} ${classes.originalPrice}`}
                        >
                          ${product.orignalPrice}
                        </Typography>
                      </div>
                    </div>

                    <span
                      className={styles.wishlistProductDeleteIcon}
                      onClick={() => {
                        deleteWishlistHandler(product.id);
                      }}
                    >
                      <Delete className={classes.deleteSvg} />
                    </span>
                  </div>
                );
              })}

            <Divider />
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.clearWishlistBtn}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Clear Wishlist
            </Button>
          </Card>
        ) : (
          <NoItemFound
            text="no favorite item found!"
            message="Add item now"
            btnText="add items"
            btnLink="/products"
          />
        )}
      </section>

      <Divider />
    </React.Fragment>
  );
}
