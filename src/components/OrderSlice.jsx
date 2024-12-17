import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: [], //stores the current orders
  userDetails: [], //store the login user details for currnet orders
  orders: [],
  userAuthenticated: false,
  newOrder: [], //contains the user details and order details
  isSavedToDatabase: false, //flag to track orders saving data to Db
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
    toggleIsSavedToDatabse(state, action) {
      state.isSavedToDatabase = !state.isSavedToDatabase;
    },

    fetchOrder(state, action) {
      if (state.orders) state.newOrder = state.orders;
    },

    getLocation() {},
    authenticateUser() {},
    updatedOrderDetails(state, action) {
      state.newOrder = state.orders;
    }, //sets the complete order of the user
  },
});

export const {
  saveOrder,
  getLocation,
  authenticateUser,
  updatedOrderDetails,
  fetchOrder,
  toggleIsSavedToDatabse,
} = orderSlice.actions;

export default orderSlice.reducer;
