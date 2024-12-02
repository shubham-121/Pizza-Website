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
      <p className="text-center">
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
    <div className="flex justify-center items-center border-2 border-black">
      <div>
        <p>{userInfo.name}</p>
        <p>{userInfo.address}</p>
        <p>{userInfo.phone}</p>
        <p>{userInfo.email}</p>
      </div>
      <div className=" border-2 border-black flex ">
        {orderItems.map((items, idx) => (
          <div key={idx}>
            <p>{items.name}</p>
            <p>{items.price}</p>
            <p>{items.quantity}</p>

            <img src={items.img}></img>
          </div>
        ))}
      </div>
    </div>
  );
}
