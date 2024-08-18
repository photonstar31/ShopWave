import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getLocalUserData } from "../localUserData";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBA1BanzMml8ZMB7i96gC5ZQu6dv_FW5vw",
  authDomain: "ecommerce-app-8b5d3.firebaseapp.com",
  projectId: "ecommerce-app-8b5d3",
  storageBucket: "ecommerce-app-8b5d3.appspot.com",
  messagingSenderId: "222051021700",
  appId: "1:222051021700:web:3697467bca1f5de58863d1",
  measurementId: "G-GEYWGY5QE5",
});

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const AppContext = createContext({
  userInfo: null,
  accountLoading: true,
  currencyType: "usd",
  setCurrencyType: null,
  cartLength: null,
  setCartItemCtx: null,
  cartItemCtx: null,

  isUserLoggedIn: false,
});

export const AppWrapper = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [accountLoading, setAccountLoading] = useState(true);
  const [currencyType, setCurrencyType] = useState("usd");
  const [cartLength, setCartLength] = useState(null);
  const [cartItemCtx, setCartItemCtx] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // checking if the user was logged in and fetching his data
  useEffect(() => {
    const getLoggedInUser = () => {
      onAuthStateChanged(auth, (user) => {
        setAccountLoading(true);
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid;

          // geting logged in user data
          const getUserData = async () => {
            const userRef = collection(db, "users");
            const q = query(userRef, where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              setIsUserLoggedIn(true);
              setUserInfo({ docId: doc.id, userData: doc.data() });
              setAccountLoading(false);
              setCurrencyType(doc.data().currency);
              setCartItemCtx(doc.data().cart);
            });
          };
          getUserData();
          // ...
        } else {
          // User is signed out
          setIsUserLoggedIn(false);
          setAccountLoading(false);
          console.log("user is signed out");

          const localUserData = getLocalUserData();
          setCartItemCtx(localUserData.cart);
          setUserInfo({
            userData: {
              cart: localUserData.cart,
              wishlist: localUserData.wishlist,
            },
          });

          // ...
        }
      });
    };
    getLoggedInUser();
  }, []);

  //// updating cartItemLength
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
        return key;
      });
      setCartLength(transformedData.length);
    };

    cartItemCtx && cartItemCtx.length > 0
      ? filterCart(cartItemCtx)
      : setCartLength(0);
  }, [cartItemCtx]);

  return (
    <AppContext.Provider
      value={{
        userInfo,
        accountLoading,
        currencyType,
        setCurrencyType,
        cartLength,
        setCartItemCtx,
        cartItemCtx,
        isUserLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
