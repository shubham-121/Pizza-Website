import { Link, Outlet } from "react-router";
import { useUser } from "../supabase/useUser";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../supabase/apiAuth";
import supabase from "../supabase/supabase";
import avatar from "./../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authenticateUser, fetchOrder, setOrder } from "./OrderSlice";

//fetches user profile data from the Db including his current orders and  user details

export default function Profile() {
  const { isLoading, user, isAuthenticated } = useUser();
  console.log(isAuthenticated);
  console.log(user);
  const dispatch = useDispatch();

  const orders = useSelector((store) => store.order.orders);
  console.log(user);
  console.log(orders);

  //fetch current loggedd in user details

  let authRole, authEmail, authId;
  if (user) {
    authRole = user.user.role;
    authEmail = user.user.email;
    authId = user.user.id;
    console.log(authRole, authEmail, authId);
  }

  //fetch orders if already present in DB for current user
  useEffect(() => {
    if (authRole == "authenticated") {
      const fetchOrder = async () => {
        try {
          const orders = await getCurrentUserOrders(authEmail, authId);
          console.log(orders);
        } catch (err) {
          console.error(err.message);
          throw new Error("Cannot fetch the user from Db");
        }
      };
      fetchOrder();
    }
  }, [authEmail, authId, authRole]);

  // Check if orders are available and not empty
  if (!orders || orders.length === 0) {
    return (
      <div>
        {/* <Outlet></Outlet> */}
        <RenderUserDetails user_email={authEmail}></RenderUserDetails>
        <p> No orders available</p>{" "}
        <Link to="/menu" className="text-blue-400">
          Go back
        </Link>
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

        {orders ? (
          <p className=" mt-5 text-center font-semibold text-xl italic text-stone-500">
            Your Current Orders Below
          </p>
        ) : (
          <p className=" mt-5 text-center font-semibold text-xl italic text-stone-500">
            No Orders Currently
          </p>
        )}

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

//function to authenticate user and insert data to the DB. Cannot be moved to separate file, due to orders=undefined, which break the component
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

  const order_id = `ORDER-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  // if valid user, upload pizzas to Db
  const ordersToInsert = orderItems.map((item) => ({
    user_id: userId, // Authenticated user ID
    name: item.name, // Pizza name
    pid: item.id, // Pizza ID
    unit_price: item.price, // Pizza price
    image: item.img, // Pizza image
    soldOut: item.soldOut, // Sold-out status
    ingredients: item.ingredients || null, // Optional: if not in item, set as null
    quantity: item.quantity, // Pizza quantity ordered
    order_id, // Shared order ID for all items in this order
    user_address: userInfo.address, // Add user's address for reference
    user_email: userInfo.email, // Add user's email for reference
  }));

  console.log(ordersToInsert);

  const { data, error } = await supabase //original working query to insert data
    .from("pizza_orders")
    .insert(ordersToInsert);

  if (error) {
    console.error(error.message);
    return [];
    // throw new Error("Cannot upload the order and user details to the Db");
  }

  console.log("Order savved successfully in the DB");
  alert("Order savved successfully in the DB ");
  return data;
}

let uniqueOrders; //stores all the unique orders

//get current loggenIn user orders from the Db and display them on the profile
export async function getCurrentUserOrders(authEmail, authId) {
  let { data: pizza_orders, error } = await supabase
    .from("pizza_orders")
    .select("name,unit_price,image,quantity")
    .eq("user_email", authEmail);

  console.log(pizza_orders);

  if (error) {
    console.error("Error in fetching orders from the DB", error.message);
    throw new Error("Error in fetching orders from the DB", error.message);
  }

  const set = new Set([]);
  pizza_orders.forEach((pizza) =>
    set.add(
      JSON.stringify({
        name: pizza.name,
        price: pizza.unit_price,
        image: pizza.image,
        quantity: pizza.quantity,
      })
    )
  );

  uniqueOrders = Array.from(set).map((item) => JSON.parse(item));

  console.log(pizza_orders);
  console.log(uniqueOrders);
  // Ensure pizza_orders is an array
  if (!pizza_orders || pizza_orders.length === 0) {
    console.log("No orders found");
    return []; // or handle with a default response
  }

  return uniqueOrders;

  //tomorrow task
  //now render the uniquerOrders in the profile component of the user
}

//await supabase.rpc('raw_sql',{sql:`SELECT DISTINCT name,unit_price,image,quantity FROM pizza_orders`});

function RenderUserDetails({ user_name, user_email, user_phoneNumber }) {
  // getCurrentUserOrders();

  return (
    <div className=" flex flex-row  justify-between items-center mr-2 ml-2 rounded-[16px]   mt-5 border-solid border-stone-300 bg-stone-100">
      <div className="  flex flex-row space-x-10 items-center ml-12 ">
        <div>
          <label className="font-bold text-lg text-gray-700">Name:</label>
          <p className="font-bold text-lg text-gray-700">{user_name}</p>
        </div>
        <div>
          <label className="font-bold text-lg text-gray-700">Phone:</label>
          <p className="font-bold text-lg text-gray-700">{user_phoneNumber}</p>
        </div>
        <div>
          <label className="font-bold text-lg text-gray-700">Email:</label>
          <p className="font-bold text-lg text-gray-700">{user_email}</p>
        </div>
      </div>
      <div>
        <img
          className="mb-3 h-[20vh] min-h-[150px] mt-6 object-cover border-2 rounded-full"
          src={avatar}
        ></img>
      </div>
    </div>
  );
}

function RenderUserPizzas({ pizza, price, img, idx }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md rounded-lg space-x-8 border border-gray-300">
      <p className="font-bold text-lg text-gray-700">{idx}</p>
      <div className="flex-1 border-l-2 pl-4">
        <p className="font-semibold text-xl text-gray-800">
          Pizza Name: {pizza}
        </p>
        <p className="font-semibold text-lg text-gray-600">
          Pizza Price: {price}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <img
          className="h-20 w-20 object-cover rounded-full border border-gray-400 shadow-sm"
          src={img}
          alt="Pizza Image"
        />
      </div>
    </div>
  );
}

// useEffect(() => {
//   // Only run when the user is authenticated and user details are available
//   if (isAuthenticated && user) {
//     const fetchOrders = async () => {
//       try {
//         // Ensure user.user.id is available
//         if (!user.user || !user.user.id) {
//           console.error("User ID is not available");
//           return;
//         }

//         const { data, error } = await getCurrentUserOrders(
//           user.user.id,
//           user.user.email
//         ); // Ensure the response structure is correct
//         console.log(data);

//         if (error) {
//           console.error("Error fetching orders:", error.message);
//         }

//         if (data) {
//           // Dispatch to update the order in the Redux store
//           // dispatch(setOrder(data));
//           console.log("Fetched order data:", data);
//         } else {
//           console.log("No orders found for the user.");
//         }
//       } catch (err) {
//         console.error("Error fetching the data:", err.message);
//       }
//     };

//     fetchOrders();
//   }
// }, [dispatch, isAuthenticated, user]); // Dependency on isAuthenticated and user
