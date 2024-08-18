import React from "react";
import styles from "../../styles/Products.module.css";
import Header from "../../components/partials/Header/Header";
import { Grid } from "@mui/material";
import { productData } from "../../data/productData";
import Divider from "../../components/partials/Divider/Divider";
import GridProduct from "../../components/app/GridProduct/GridProduct";

const Products = () => {
  return (
    <React.Fragment>
      <Header heading="Products" path="Products" />
      <Divider />

      <section className={styles.products}>
        <Grid
          container
          columnGap="53px"
          justifyContent="center"
          rowGap="81px"
          className={styles.productsContainer}
        >
          {productData.map((product) => {
            return (
              <GridProduct
                key={product.id}
                product={product}
                href={`products/${product.type}`}
                showIcons={false}
                toggleCartHandler={null}
                toggleWishlistHandler={null}
                userWishlistState={null}
                userCartState={null}
              />
            );
          })}
        </Grid>
      </section>
      <Divider />
    </React.Fragment>
  );
};

export default Products;
