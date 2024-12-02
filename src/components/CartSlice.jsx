import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], //stores all data related to the pizza
  totalItems: 0,
  totalPrice: 0,
  pizzaArray: [], //stores pizza only
  totalFavItems: 0,
  favourites: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: {
      prepare(name, id, price, soldOut, img, quantity) {
        return {
          payload: { name, id, price, soldOut, img, quantity },
        };
      },

      reducer(state, action) {
        const { name, id, price, soldOut, img, quantity } = action.payload;
        // const pizzaData = [name, id, price, soldOut, img, quantity];

        const exsistingItem = state.cartItems.find((item) => item.id === id);
        if (exsistingItem) exsistingItem.quantity += 1;
        else state.cartItems.push({ name, id, price, soldOut, img, quantity });

        state.totalItems += quantity;
        state.totalPrice += quantity * price;

        if (!state.pizzaArray.includes(id)) {
          state.pizzaArray.push(id);
        }

        console.log("data recieved:", name, id, price, soldOut);
        console.log("updated cart:", state.cartItems);
        console.log(
          `Cart price for ${state.totalItems} is ${state.totalPrice}`
        );
      },
    },

    removeFromCart(state, action) {},

    increaseQuantity(state, action) {
      const id = action.payload;
      const updateQuantity = state.cartItems.find((item) => item.id == id);
      console.log(updateQuantity);
      if (updateQuantity) {
        updateQuantity.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += updateQuantity.price;
      }

      console.log(
        "Increase quantity of pizza:",
        state.totalItems,
        state.totalPrice
      );
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const updatedQuantity = state.cartItems.find((item) => item.id === id);
      if (updatedQuantity && updatedQuantity.quantity > 1) {
        updatedQuantity.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= updatedQuantity.price;
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalItems -= 1;
        state.totalPrice -= updatedQuantity.price;
      }
    },
    updateCart(state, action) {},

    addToFavourites: {
      prepare(name, id, price, soldOut, img, quantity) {
        return {
          payload: { name, id, price, soldOut, img, quantity },
        };
      },

      reducer(state, action) {
        const { name, id, price, soldOut, img, quantity } = action.payload;
        const favs = { name, id, price, soldOut, img, quantity };

        const exsistingItem = state.favourites.find((item) => item.id === id);
        if (exsistingItem) exsistingItem.quantity += 1;
        else state.favourites.push(favs);

        state.totalFavItems += quantity;

        console.log("Added to favourties", state.favourites);
      },
    },
    removeFromFavs(state, action) {},

    sortCart(state, action) {
      const sortedCartItems = action.payload;
      state.cartItems = sortedCartItems;
      console.log("Cart updated by price");
    },
    sortFavourites(state, action) {
      const sortedFavItems = action.payload;
      state.favourites = sortedFavItems;
      console.log("Favourites updated");
    },
    quickView(state) {},
  },
});

export const {
  addToCart,
  removeFromCart,
  sortCart,
  increaseQuantity,
  decreaseQuantity,
  addToFavourites,
  removeFromFavs,
  sortFavourites,
} = cartSlice.actions;
export default cartSlice.reducer;
