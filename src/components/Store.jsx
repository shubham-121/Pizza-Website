import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";

const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});

console.log(store.getState());

export default store;
