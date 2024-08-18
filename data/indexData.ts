import discountItemCouch from "../assets/img/couch.png";
import discountItemPlasticChair from "../assets/img/discountItemChair.png";
import woodChair from "../assets/img/wood-chair.png";
import trendingClock from "../assets/img/trending-clock.png";
import trendingDrawer from "../assets/img/trending-drawer.png";

export const latestProductsLink = [
  "New Arrival",
  "Best Seller",
  "Featured",
  "Special Offer",
];

export const trendingProductsOtherTrendingData = [
  {
    title: "23% off in all products",
    link: "Shop Now",
    goto: "clock",
    img: trendingClock,
    imgStyle: { width: 213, height: 207 },
  },
  {
    title: "23% off in all products",
    link: "View Collection",
    goto: "drawer",
    img: trendingDrawer,
    imgStyle: { width: 312, height: 173 },
  },
];

export const discountItemLink = [
  "Wood Chair",
  "Plastic Chair",
  "Sofa Collection",
];

export const discountItemData = [
  {
    offer: "20% Discount Of All Products",
    img: woodChair,
    imgStyle: { width: 699 },
    productTitle: "Eams Wood Chair Compact",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.",
    category: "Wood Chair",
    id: 1,
    features: [
      "High Quality Soft foam.",
      "Adjustable Seat Height, Armrest.",
      "Simple neutral colours.",
      "Frame Material: Solid Wood.",
    ],
    link: "/products/chair",
  },
  {
    offer: "18% Discount Of All Products",
    img: discountItemPlasticChair,
    imgStyle: {
      width: 500,
      height: "max-content",
      top: "50%",
      transform: "translateY(-50%)",
    },
    productTitle: "Eams Plastic Chair Compact",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.",
    category: "Plastic Chair",
    id: 2,
    features: [
      "High Quality Frame Material",
      "Clear lines and geomatric figures",
      "Simple neutral colours.",
      "Material expose like metals",
    ],
    link: "/products/chair",
  },
  {
    offer: "25% Discount Of All Products",
    img: discountItemCouch,
    imgStyle: { width: 580 },
    productTitle: "Sofa Collection",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.",
    category: "Sofa Collection",
    id: 3,
    features: [
      "Material expose like metals",
      "Clear lines and geomatric figures",
      "Simple neutral colours.",
      "Material expose like metals",
    ],
    link: "/products/sofa",
  },
];
export const topCategoryBtnData = ["1", "2", "3"];
