import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: [], //stores the current orders
  userDetails: [], //store the login user details for currnet orders
  orders: [],
  userAuthenticated: false,
};

const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    saveOrder(state, action) {
      const { name, address, phone, email, cartItems } = action.payload;

      const userInfo = { name, address, phone, email }; //separately for user details

      const newOrder = {
        //combine user details along with the user cart items
        userInfo,
        orderItems: cartItems,
      };
      state.orders = [...state.orders, newOrder];

      console.log("Updated order details", state.orders);
    },
  },
  getLocation() {},
  authenticateUser() {},
});

export const { saveOrder, getLocation, authenticateUser } = orderSlice.actions;

export default orderSlice.reducer;
