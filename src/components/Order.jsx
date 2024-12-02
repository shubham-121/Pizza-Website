import { Form, Outlet, redirect } from "react-router";
import Button from "./Button";
import Button2 from "./Button2";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "./Store";
import { saveOrder } from "./OrderSlice";

// let userCart; //for storing the cart items and accesing in the action loader

export default function Order() {
  return (
    <div>
      <Outlet></Outlet>
      <div>
        <p className="text-center text-xl font-semibold italic">
          Please Confirm Your Order By Entering The Required Details.
        </p>
        <Form
          method="POST"
          className="mt-2  border-2 border-stone-400 border-solid h-[70vh] max-w-[100%] "
        >
          <div className="flex justify-center border-2 border-black  mt-8 items-center space-y-8 flex-col">
            <div className=" flex mt-4  flex-row space-x-10 justify-center items-center">
              <span className=" text-xl font-semibold italic text-center border-2 min-w-[20vw]">
                Name:
              </span>
              <input
                name="name"
                type="text"
                placeholder="Enter Your Name"
                required
                className="min-w-[30vw] min-h-[8vh] border-2 border-black border-solid rounded-full text-center"
              ></input>
            </div>

            <div className="flex  flex-row space-x-10 justify-center items-center">
              <span className="text-center text-xl font-semibold italic border-2 min-w-[20vw]">
                Address:
              </span>
              <input
                name="address"
                type="text"
                placeholder="Enter Your Address"
                required
                className="min-w-[30vw] min-h-[8vh]  border-2  border-black border-solid rounded-full text-center"
              ></input>
            </div>

            <div className="flex  flex-row space-x-10 justify-center items-center">
              <span className="text-center text-xl font-semibold italic border-2 min-w-[20vw]">
                Phone Number:
              </span>
              <input
                name="phoneNumber"
                type="text"
                placeholder="Enter Your Phone Number"
                required
                className="min-w-[30vw] min-h-[8vh] border-2 border-black border-solid rounded-full text-center"
              ></input>
            </div>

            <div className="flex  flex-row space-x-10 justify-center items-center">
              <span className="text-center text-xl font-semibold italic border-2 min-w-[20vw]">
                Email:
              </span>
              <input
                name="email"
                type="text"
                placeholder="Enter Your Email"
                required
                className="min-w-[30vw] min-h-[8vh] border-2 border-black border-solid rounded-full text-center"
              ></input>
            </div>
            <div className="flex flex-row justify-center items-center space-x-16">
              <Button2 style={{ marginLight: "40px" }} content={"Submit"}>
                {" "}
              </Button2>
              <Button2 content={"Cancel"}> </Button2>
            </div>
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
    //
  } catch (err) {
    alert("Problem in confirming your order");
    console.log("Problem in confirming your order", err);
  }

  // console.log(store);

  return redirect("/orderSummary"); //move the webpage to the orderSummary page
}
