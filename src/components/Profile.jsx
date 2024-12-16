import { Link, Outlet } from "react-router";
import { useUser } from "../supabase/useUser";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../supabase/apiAuth";
import supabase from "../supabase/supabase";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

//fetches user profile data from the Db including his current orders and  user details

export default function Profile() {
  const { isLoading, user, isAuthenticated } = useUser();

  const orders = useSelector((store) => store.order.orders);
  console.log(orders);
  // Check if orders are available and not empty
  if (!orders || orders.length === 0) {
    return (
      <div>
        {" "}
        <p> No orders available</p> <Link to="/menu"> Go back </Link>
      </div>
    ); // Handle the case where orders are not available
  }

  const { userInfo, orderItems } = orders[0];

  const pizzaOrders = orders[0].orderItems;
  const { address, email, name, phone } = orders[0].userInfo;
  console.log(pizzaOrders);
  // console.log(address, email, name, phone);

  console.log(user);

  let user_name;
  let user_email;
  let user_phoneNumber;
  //get current user details
  if (user) {
    user_name = user.user.user_metadata.name;
    user_email = user.user.user_metadata.email;
    user_phoneNumber = user.user.user_metadata.phoneNumber;
    console.log(user_name, user_phoneNumber, user_email);
  }

  return (
    <div>
      <Outlet></Outlet>
      <div>
        {user && (
          <RenderUserDetails
            user_name={user_name}
            user_email={user_email}
            user_phoneNumber={user_phoneNumber}
          ></RenderUserDetails>
        )}
        <PlacePizzaOrders
          userInfo={userInfo}
          orderItems={orderItems}
        ></PlacePizzaOrders>
        {orders &&
          orders[0].orderItems.map((order, idx) => (
            <RenderUserPizzas
              key={idx}
              pizza={order.name}
              price={order.price}
              img={order.img}
              idx={++idx}
            ></RenderUserPizzas>
          ))}
      </div>
    </div>
  );
}

function PlacePizzaOrders({ userInfo, orderItems }) {
  const [status, setStatus] = useState("Placing order...");

  useEffect(() => {
    const placeOrder = async () => {
      try {
        await getCurrentSession(userInfo, orderItems);
        setStatus("Your order has been placed successfully!");
      } catch (err) {
        console.error(err.message);
        setStatus("Failed to place order. Please try again.");

        throw new Error("Cannot place the data in the DB");
      }
    };
    placeOrder();
  }, [userInfo, orderItems]);
  // const data = getCurrentSession(userInfo, orderItems);
  // console.log(data);
  return (
    <div className="text-center font-semibold text-xl italic">
      Your Current Order!
    </div>
  );
}

export async function getCurrentSession(userInfo, orderItems) {
  //check for authenticated user

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session)
    throw new Error("user must be authneticated to place an order");

  const userId = session.user.id;
  console.log(userId);

  const orderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  // if valid user, upload pizzas to Db
  const ordersToInsert = orderItems.map((item) => ({
    user_id: userId, // Authenticated user ID
    name: item.name, // Pizza name
    pid: item.id, // Pizza ID
    unitPrice: item.price, // Pizza price
    image: item.img, // Pizza image
    soldOut: item.soldOut, // Sold-out status
    ingredients: item.ingredients || null, // Optional: if not in item, set as null
    quantity: item.quantity, // Pizza quantity ordered
    orderId, // Shared order ID for all items in this order
    user_address: userInfo.address, // Add user's address for reference
    user_email: userInfo.email, // Add user's email for reference
  }));

  console.log(ordersToInsert);

  const { data, error } = await supabase
    .from("pizza-orders")
    .insert(ordersToInsert);

  if (error) {
    console.error(error.message);
    throw new Error("Cannot upload the order and user details to the Db");
  }

  console.log("Order savved successfully in the DB");
  alert("Order savved successfully in the DB ");
  return data;
}

function RenderUserDetails({ user_name, user_email, user_phoneNumber }) {
  return (
    <div className="max-w-[30vw] mt-4 border-2 border-black border-solid flex justify-start items-start flex-col">
      <p>Name: {user_name} </p>
      <p>Email: {user_email} </p>
      <p>Phone: {user_phoneNumber} </p>
    </div>
  );
}

function RenderUserPizzas({ pizza, price, img, idx }) {
  return (
    <div className="flex justify-between items-center space-x-8 border-2 border-black border-solid">
      <p className="font-semibold text-xl italic ">{idx}</p>
      <div className=" border-2 border-black w-1/2 justify-center items-center flex flex-col">
        <p className="font-semibold text-xl italic ">Pizza Name: {pizza}</p>
        <p className="font-semibold text-xl italic ">Pizza Price: {price}</p>
      </div>
      <div className="flex border-2 w-full justify-end  ">
        <img
          className="max-h-[20vh] max-w-[20vw]  rounded-full"
          src={img}
          alt="Pizza Image"
        />
      </div>
    </div>
  );
}
