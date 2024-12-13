import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
  isSignedIn: "Sign In", //switch to logged-in once user signs in
  disabled: false, //if user logged-in, disable the sign in button
};

const AuthSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuth = true;
      console.log("Authenticated", state.isAuth);
    },
    logOut(state, action) {
      state.isAuth = false;
      console.log("Log out sucessfully", state.isAuth);
    },
    failure(state, action) {
      state.isAuth = false;
      console.log("auth failed", state.isAuth);
    },
    loading() {},
    toggleSignIn(state, action) {
      state.isSignedIn = "Logged In";
    },
    toggleSignOut(state, action) {
      state.isSignedIn = "Sign In";
    },
    disableSignIn(state, action) {
      state.disabled = !state.disabled;
    },
  },
});

export default AuthSlice.reducer;

export const {
  loginSuccess,
  logOut,
  failure,
  loading,
  toggleSignIn,
  toggleSignOut,
  disableSignIn,
} = AuthSlice.actions;

// addToCart: {
//       prepare(name, id, price, soldOut, img, quantity) {
//         return {
//           payload: { name, id, price, soldOut, img, quantity },
//         };
//       },

//       reducer(state, action) {
//         const { name, id, price, soldOut, img, quantity } = action.payload;
//         // const pizzaData = [name, id, price, soldOut, img, quantity];

//         const exsistingItem = state.cartItems.find((item) => item.id === id);
//         if (exsistingItem) exsistingItem.quantity += 1;
//         else state.cartItems.push({ name, id, price, soldOut, img, quantity });

//         state.totalItems += quantity;
//         state.totalPrice += quantity * price;

//         if (!state.pizzaArray.includes(id)) {
//           state.pizzaArray.push(id);
//         }

//         console.log("data recieved:", name, id, price, soldOut);
//         console.log("updated cart:", state.cartItems);
//         console.log(
//           `Cart price for ${state.totalItems} is ${state.totalPrice}`
//         );
//       },
//     },
