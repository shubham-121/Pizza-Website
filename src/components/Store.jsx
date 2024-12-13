import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import OrderReducer from "./OrderSlice";
import AuthReducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    cart: CartReducer,
    order: OrderReducer,
    authentication: AuthReducer,
  },
});

console.log(store.getState());

export default store;
