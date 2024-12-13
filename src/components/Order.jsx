import { Form, Outlet, redirect } from "react-router";
import Button from "./Button";
import Button2 from "./Button2";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "./Store";
import { saveOrder } from "./OrderSlice";
import { clearCart, toggleOrder } from "./CartSlice";

// let userCart; //for storing the cart items and accesing in the action loader

export default function Order() {
  return (
    <div>
      <Outlet></Outlet>
      <OrderForm></OrderForm>
    </div>
  );
}

function OrderForm() {
  return (
    <div className="flex items-center justify-center mt-4 ">
      {" "}
      <div className="bg-white p-8 rounded-lg shadow-custom max-h-[80vh]  max-w-2xl w-full border-2 border-stone-400">
        <p className="text-center text-xl font-semibold italic mb-2">
          Please Confirm Your Order By Entering The Required Details.
        </p>
        <Form method="POST" className="space-y-6">
          <div className="flex flex-col space-y-4">
            {/* Name input */}
            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold italic text-center w-32">
                Name:
              </span>
              <input
                name="name"
                type="text"
                placeholder="Enter Your Name"
                required
                className="p-3 w-2/3 min-h-[8vh] border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address input */}
            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold italic text-center w-32">
                Address:
              </span>
              <input
                name="address"
                type="text"
                placeholder="Enter Your Address"
                required
                className="p-3 w-2/3 min-h-[8vh] border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone number input */}
            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold italic text-center w-32">
                Phone Number:
              </span>
              <input
                name="phoneNumber"
                type="text"
                placeholder="Enter Your Phone Number"
                required
                className="p-3 w-2/3 min-h-[8vh] border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email input */}
            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold italic text-center w-32">
                Email:
              </span>
              <input
                name="email"
                type="text"
                placeholder="Enter Your Email"
                required
                className="p-3 w-2/3 min-h-[8vh] border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit and Cancel buttons (Unchanged) */}
          <div className="flex justify-center items-center space-x-16">
            <Button2 style={{ marginLight: "40px" }} content={"Submit"} />
            <Button2 content={"Cancel"} />
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {
  try {
    const formData = await request.formData();
    console.log(formData);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    //also get the current cart items of the user
    const state = store.getState();
    const { cartItems } = state.cart;

    console.log(cartItems);

    const userOrder = {
      ...data,
      cartItems: cartItems,
    };
    console.log("User order is:", userOrder);

    store.dispatch(saveOrder(userOrder)); //update the order in the order slice
    store.dispatch(toggleOrder()); // to tell whether order is preparing
    store.dispatch(clearCart());
  } catch (err) {
    alert("Problem in confirming your order");
    console.log("Problem in confirming your order", err);
  }

  // console.log(store);

  return redirect("/orderSummary"); //move the webpage to the orderSummary page
}
