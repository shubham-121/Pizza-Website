import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Button from "./Button";
import Button2 from "./Button2";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { addToCart, addToFavourites } from "./CartSlice";
import getPizzas from "../supabase/apiPizzas";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const pizzaMenuApi = "http://localhost:4000/pizza-data";

export default function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItem, pizzaArray } = useSelector((store) => store.cart);

  const [pizzaData, setPizzaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addNew, setAddNew] = useState(false);

  function handleAddNewPizza(prev) {
    setAddNew(!prev);
    navigate("/addNewPizza");
    console.log("clicked");
  }

  return (
    <div>
      <Outlet></Outlet>

      <GetPizzaMenu
        pizzaData={pizzaData}
        setPizzaData={setPizzaData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      ></GetPizzaMenu>
      <div className="bg-stone-300 flex flex-col justify-center items-center">
        <p className="mt-2 text-xl font-bold italic">
          Want to upload your pizza?
        </p>

        <Button
          style={
            "bg-purple-500  h-14 w-[10vw] rounded-[20px] mt-2 text-center text-xl font-semibold "
          }
          content="Add New Pizza!"
          onClick={handleAddNewPizza}
        ></Button>
      </div>
    </div>
  );
}

function GetPizzaMenu({ isLoading, setIsLoading }) {
  // useEffect(() => {
  //   async function getPizzas() {
  //     try {
  //       const res = await fetch("http://localhost:4000/pizza-data");
  //       const data = await res.json();

  //       if (data) {
  //         console.log(data);
  //         setPizzaData(data);
  //       } else
  //         throw new Error(
  //           "Something went wrong!😔 Cannot load the pizza menu,try again"
  //         );
  //     } catch (err) {
  //       alert("Problem in loading the menu ");
  //       console.log("Error encountered:", err);
  //     }
  //   }
  //   getPizzas();
  // }, [setPizzaData]);

  //fetch pizzas from the database
  // useEffect(() => {
  //   getPizzas().then((pizza) => {
  //     console.log(pizza);
  //     setPizzaData(pizza);
  //   });
  // }, [setPizzaData]);

  const queryClient = useQueryClient();

  const {
    isLoading: isPizzaLoading,
    data: pizzaData,
    error,
  } = useQuery({
    queryKey: ["pizzas"],
    queryFn: getPizzas,
  });

  if (isPizzaLoading) {
    setIsLoading(!isLoading);
    return <div>Loading pizzas,plaese wait....</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  console.log(pizzaData);

  return (
    <div className="bg-stone-300 scroll-smooth ">
      <h4 className="text-center text-stone-700 text-4xl italic font-semibold mt-4">
        Explore from a variety of our Pizzas
      </h4>
      <div className="p-4 flex flex-wrap justify-center items-center gap-6">
        {pizzaData?.map((pizza, idx) => (
          <RenderPizzaMenu
            key={idx}
            id={pizza.id}
            name={pizza.name}
            price={pizza.unitPrice}
            img={pizza.image}
            ingredients={pizza.ingredients}
            soldOut={pizza.soldOut}
            defaultQuantity={1}
          ></RenderPizzaMenu>
        ))}
      </div>
    </div>
  );
}

function RenderPizzaMenu({
  id,
  name,
  price,
  img,
  ingredients,
  soldOut,
  defaultQuantity,
}) {
  const dispatch = useDispatch();
  const { cartItems, pizzaArray } = useSelector((store) => store.cart);
  const quantity = defaultQuantity; //default quantity is 1 for every pizza
  const [isClicked, setIsClicked] = useState(false); //for rendering the color of add to cart button
  const [notification, setNotification] = useState(false); //for displaying the notification of item addde to the cart

  return (
    <div className="flex flex-col border-2 p-2 m-4 max-w-[20vw] max-h-[90vh] hover:scale-110 hover:shadow-custom rounded-[10px] ">
      <div className="bm-4 flex justify-center items-center">
        <img
          src={img}
          alt="name"
          className="min-w-[20vw] min-h-[10vh] object-cover  rounded-[30px]"
        ></img>
      </div>
      <div className="max-w-[30vw] flex flex-col justify-center items-center">
        <p className="text-xl font-semibold italic text-center">{name}</p>
        <p className="text-xl font-semibold italic text-center">${price}/-</p>

        <div className="flex flex-wrap justify-start gap-3 max-w-full overflow-hidden">
          {ingredients?.map((ingred, idx) => (
            <p
              className="inline-block text-center font-semibold mx-2 my-1 px-3 py-1 bg-gray-200 rounded-full"
              key={idx}
            >
              {ingred}
            </p>
          ))}
        </div>
        <div className="flex  flex-row flex-wrap justify-center items-center">
          <Button2
            onClick={() => {
              if (soldOut)
                alert("Cannot add the pizza to the cart as it is sold out");
              else {
                setIsClicked(true);
                setNotification(true);
                dispatch(addToCart(name, id, price, soldOut, img, quantity));
                setTimeout(() => setNotification(false), 3000); //reset notification

                // setTimeout(() => {
                //   //reset color to red after 4 seconds
                //   setIsClicked(false);
                // }, 4000);
              }
            }}
            content={"Add To Cart"}
            color={isClicked ? "bg-green-500" : "bg-red-400"}
          ></Button2>
          <Button2
            content={"Add To Favs"}
            onClick={() => {
              dispatch(
                addToFavourites(name, id, price, soldOut, img, quantity)
              );
            }}
          ></Button2>
          {/* <button style={{ backgroundColor: "greeen" }}></button> */}

          {soldOut ? (
            <Button2
              style={{
                backgroundColor: "gray",
                textDecoration: "line-through",
              }}
              content={"Sold out 😥"}
            ></Button2>
          ) : (
            <Button2 content={"Available✅"}></Button2>
          )}
          {/* <button
            style={{ backgroundColor: "gray", textDecoration: "lineThrough" }}
          >
            Hi
          </button> */}
        </div>
      </div>
      {notification && <AddedToCartNotification></AddedToCartNotification>}
    </div>
  );
}

function AddedToCartNotification() {
  return (
    // <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50  ">
    <div className="border-2 border-black bg-green-500  bottom-0  px-4 py-1 relative z-50 w-[15vw] rounded-full  ">
      <p>Pizza added to the cart</p>
    </div>
  );
}
