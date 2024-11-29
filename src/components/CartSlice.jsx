import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], //stores all data related to the pizza
  totalItems: 0,
  totalPrice: 0,
  pizzaArray: [], //stores pizza only
  favs: "",
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: {
      prepare(name, id, price, soldOut) {
        return {
          payload: { name, id, price, soldOut },
        };
      },

      reducer(state, action) {
        const { name, id, price, soldOut } = action.payload;
        const pizzaData = [name, id, price, soldOut];
        state.cartItems = [...state.cartItems, pizzaData];

        state.totalItems = state.totalItems + 1;
        state.totalPrice = state.totalPrice + price;
        state.pizzaArray = [...state.pizzaArray, name]; //holds  pizza name only

        console.log("data recieved:", name, id, price, soldOut);
        console.log("updated cart:", state.cartItems);
        console.log(
          `Cart price for ${state.totalItems} is ${state.totalPrice}`
        );
      },
    },

    removeFromCart(state, action) {},
    addToFavs(state, action) {},
    removeFromFavs(state, action) {},

    sortCart(state, action) {},
    quickView(state) {},
  },
});

export const { addToCart, removeFromCart, sortCart } = cartSlice.actions;
export default cartSlice.reducer;
