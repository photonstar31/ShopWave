export const getLocalUserData = () => {
  const localUserCart = localStorage.getItem("cart");
  const localUserWishlist = localStorage.getItem("wishlist");

  const cart = localUserCart ? localUserCart.split(",") : [];
  const wishlist = localUserWishlist ? localUserWishlist.split(",") : [];

  const localUserCartItem = cart.map(Number);
  const localUserWishlistItem = wishlist.map(Number);

  return {
    cart: localUserCartItem,
    wishlist: localUserWishlistItem,
  };
};
