import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import OrderReducer from "./OrderSlice";

const store = configureStore({
  reducer: {
    cart: CartReducer,
    order: OrderReducer,
  },
});

console.log(store.getState());

export default store;
