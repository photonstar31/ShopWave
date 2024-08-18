import "../styles/globals.css";
import Layout from "../components/partials/Layout/Layout";
import { ThemeProvider } from "@material-ui/core";
import { initializeApp } from "firebase/app";
import NProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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

import { AppWrapper } from "../store/context/appContext";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AppWrapper>
  );
}

export default MyApp;
