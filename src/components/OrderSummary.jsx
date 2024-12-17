import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router";
import { getCurrentSession } from "./Profile";
import { useEffect, useState } from "react";
import { toggleIsSavedToDatabse } from "./OrderSlice";

export default function OrderSummary() {
  const dispatch = useDispatch();
  const { orderDetails, userDetails, orders, isSavedToDatabase } = useSelector(
    (store) => store.order
  );
  const [status, setStatus] = useState("Saving order to database...");
  const [isSubmitting, setIsSubmitting] = useState(false); //track data saving in DB

  console.log(orders);
  console.log(orderDetails);

  if (!orders || orders.length === 0) {
    return (
      <div>
        <p>No orders available</p>
        <Link to="/menu">Go back</Link>
      </div>
    ); // Handle the case where orders are not available
  }

  const { userInfo, orderItems } = orders[0];

  useEffect(() => {
    if (!isSavedToDatabase && orders.length > 0 && !isSubmitting) {
      setIsSubmitting(true); // Lock to prevent further submissions

      async function saveOrderToDatabase() {
        try {
          await getCurrentSession(userInfo, orderItems);

          // Dispatch to update state once saved
          dispatch(toggleIsSavedToDatabse());

          // Update status message
          setStatus("Your order has been saved successfully!");
        } catch (err) {
          console.error("Error uploading to the Databse", err.message);
          setStatus("Error uploading the order, please try again.");
        } finally {
          setIsSubmitting(false); // Reset submitting flag
        }
      }

      saveOrderToDatabase(); // Trigger order save
    }
  }, [orders, dispatch, isSavedToDatabase, isSubmitting, userInfo, orderItems]);

  return (
    <div>
      <Outlet />
      <p className="text-center mt-5 text-xl font-semibold italic">{status}</p>
      <div>
        {orders.map((order, idx) => (
          <RenderUserOrder key={idx} order={order} />
        ))}
      </div>
    </div>
  );
}
function RenderUserOrder({ order }) {
  const { userInfo, orderItems } = order;
  return (
    <div className="mt-5 flex flex-wrap justify-center items-start border-2 border-stone-300 p-4">
      {/* User Info */}
      <div className="flex  flex-col items-start flex-1 border-2 mt-16 mr-2 p-4 max-w-xs">
        <p className="font-bold shadow-md text-xl italic">User Details:</p>
        <p className="font-semibold text-l italic">Name: {userInfo.name}</p>
        <p className="font-semibold text-l italic">
          Address: {userInfo.address}
        </p>
        <p className="font-semibold text-l italic">Phone: {userInfo.phone}</p>
        <p className="font-semibold text-l italic">Email: {userInfo.email}</p>
      </div>

      {/* Render Cart Pizzas */}
      <div className="flex flex-wrap justify-center items-center gap-4 overflow-auto max-h-[50vh] flex-1 border-2 p-4">
        {orderItems.map((items, idx) => (
          <div
            key={idx}
            className="flex flex-col border-2 p-4 justify-center items-center min-w-[150px] max-w-[200px] hover:scale-110"
          >
            <img
              className="h-[20vh] rounded-full object-cover"
              src={items.img}
              alt="Pizza"
            ></img>
            <div className="flex flex-col justify-center items-center space-y-2 mt-2">
              <p className="font-semibold text-l italic">Pizza: {items.name}</p>
              <p className="font-semibold text-l italic">
                Price: ${items.price}
              </p>
              <p className="font-semibold text-l italic">
                Quantity: {items.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
