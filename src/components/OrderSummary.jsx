import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";

export default function OrderSummary() {
  const dispatch = useDispatch();
  const { orderDetails, userDetails, orders } = useSelector(
    (store) => store.order
  );
  console.log(orderDetails);
  return (
    <div>
      <Outlet></Outlet>
      <p className="text-center mt-5 text-xl font-semibold italic ">
        Your order is being prepared, please wait😋😋
      </p>
      <div>
        {orders.map((order, idx) => (
          <RenderUserOrder key={idx} order={order}></RenderUserOrder>
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
