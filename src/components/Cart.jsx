import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Button from "./Button";
import Button2 from "./Button2";
import { decreaseQuantity, increaseQuantity, sortCart } from "./CartSlice";
import { useState } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, totalItems, totalPrice, pizzaArray } = useSelector(
    (store) => store.cart
  );

  const [sortType, setSortType] = useState("Sort");

  console.log("New Cart items: ", cartItems, totalPrice);

  function handleSortType(e) {
    const sortOption = e.target.value;
    setSortType(sortOption);

    let sortedCartItems;

    if (sortOption === "price") {
      sortedCartItems = [...cartItems].sort((a, b) => b.price - a.price);
      dispatch(sortCart(sortedCartItems));
    } else if (sortOption === "quantity") {
      sortedCartItems = [...cartItems].sort((a, b) => b.quantity - a.quantity);
      dispatch(sortCart(sortedCartItems));
    } else if (sortOption === "name") {
      sortedCartItems = [...cartItems].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      dispatch(sortCart(sortedCartItems));
    }
  }

  return (
    <div>
      <Outlet></Outlet>
      <div className="overflow-y-scroll min-h-[90vh] max-w-[100vw] mt-6 ml-5 mr-5 border-solid border-2 border-black">
        <select
          onChange={(e) => {
            handleSortType(e);
            // dispatch(sortCart(sortType));
          }}
          className="hover:scale-110 border-2 border-solid border-black px-4 py-1 mt-4 ml-4 bg-red-400  rounded-full w-[10vw] font-semibold  text-l"
        >
          <option className="text-center w-[2vw]" disabled>
            Sort
          </option>
          <option value={"name"} className="text-center w-[2vw]">
            By Name
          </option>
          <option value={"price"} className="text-center w-[2vw]">
            By Price
          </option>
          <option value={"quantity"} className="text-center w-[2vw]">
            By Quantity
          </option>
        </select>
        <p className="text-center italic text-xl font-semibold underline border-2 mt-4 ml-4 mr-4">
          {totalItems
            ? "Pizzas In Your Cart!😍"
            : "Oops No Pizzas In Your Cart For Now!😥"}
        </p>
        <div>
          {cartItems.map((item, idx) => (
            <RenderCartItems item={item} key={idx}></RenderCartItems>
          ))}
        </div>
      </div>

      {/* Total Section */}
      <div className="flex flex-col border-2 border-black max-w-[90vw] min-h-[25vh] justify-center items-center mt-4 ml-16">
        {/* Price and Quantity in Opposite Corners */}
        <div className="flex justify-between w-full px-10 border-2 py-4 items-center">
          <p className="text-xl font-bold italic">Total Price: ${totalPrice}</p>
          <p className="text-xl font-bold italic">
            Total Quantity: {totalItems}
          </p>
        </div>

        <p className="text-xl font-bold italic mt-4">
          Your total for {totalItems} pizzas is ${totalPrice}. Confirm Your
          Order Now!
        </p>

        <div className="flex flex-row space-x-24">
          <Button2
            style={{ marginBottom: "20px" }}
            content={"Order Now!"}
            onClick={() => navigate("/order")}
          ></Button2>

          <Button2
            style={{ marginBottom: "20px" }}
            content={"Clear Cart?"}
          ></Button2>
        </div>
      </div>
    </div>
  );
}

function RenderCartItems({ item }) {
  const dispatch = useDispatch();

  console.log(item);
  console.log("Pizza quantity", item.quantity);

  return (
    <div className=" hover:shadow-custom mt-7 border-2 border-stone-300 rounded-full flex justify-center items-center space-x-7">
      <img className="h-20 w-20 rounded-full object-cover" src={item.img}></img>
      <div className="flex-1 space-x-2 flex-col justify-start items-start ">
        <h6 className="font-semibold text-xl italic  text-gray-900">
          Name: Pizza {item.name}
        </h6>
        <h6 className="font-semibold text-xl italic text-gray-500">
          Delicious & Fresh
        </h6>
      </div>
      <div className="flex space-x-5 flex-row  items-center">
        <h6 className="font-semibold text-xl italic">
          Price: {item.price * item.quantity} /-
        </h6>
        <button
          className=" border-2 rounded-full bg-red-500 w-8 h-8 text-center font-bold hover:scale-110"
          onClick={() => dispatch(increaseQuantity(item.id))}
        >
          +
        </button>
        <h6 className="font-semibold text-xl italic ">
          Quantity: {item.quantity}
        </h6>
        <button
          className="border-2 rounded-full bg-red-500 w-8 h-8 text-center font-bold hover:scale-110"
          onClick={() => dispatch(decreaseQuantity(item.id))}
        >
          -
        </button>
        <h6></h6>
      </div>
    </div>
  );
}
