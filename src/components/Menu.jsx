import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Button from "./Button";
import Button2 from "./Button2";

const pizzaMenuApi = "http://localhost:4000/pizza-data";

export default function Menu() {
  const [pizzaData, setPizzaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Outlet></Outlet>

      <GetPizzaMenu
        pizzaData={pizzaData}
        setPizzaData={setPizzaData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      ></GetPizzaMenu>
    </div>
  );
}

function GetPizzaMenu({ pizzaData, setPizzaData, isLoading, setIsLoading }) {
  useEffect(() => {
    async function getPizzas() {
      try {
        const res = await fetch("http://localhost:4000/pizza-data");
        const data = await res.json();

        if (data) {
          console.log(data);
          setPizzaData(data);
        } else
          throw new Error(
            "Something went wrong!😔 Cannot load the pizza menu,try again"
          );
      } catch (err) {
        alert("Problem in loading the menu ");
        console.log("Error encountered:", err);
      }
    }
    getPizzas();
  }, [setPizzaData]);

  return (
    <div className="bg-stone-300">
      <h4 className="text-center text-stone-700 text-4xl italic font-semibold mt-4">
        Explore from a variety of our Pizzas
      </h4>
      <div className="p-4 flex flex-wrap justify-center items-center gap-6">
        {pizzaData.map((pizza, idx) => (
          <RenderPizzaMenu
            key={idx}
            id={pizza.id}
            name={pizza.name}
            price={pizza.unitPrice}
            img={pizza.imageUrl}
            ingredients={pizza.ingredients}
            soldOut={pizza.soldOut}
          ></RenderPizzaMenu>
        ))}
      </div>
    </div>
  );
}

function RenderPizzaMenu({ id, name, price, img, ingredients, soldOut }) {
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
          {ingredients.map((ingred, idx) => (
            <p
              className="inline-block text-center font-semibold mx-2 my-1 px-3 py-1 bg-gray-200 rounded-full"
              key={idx}
            >
              {ingred}
            </p>
          ))}
        </div>
        <div className="flex  flex-row flex-wrap justify-center items-center">
          <Button2 content={"Add To Cart"}></Button2>
          <Button2 content={"Add To Favs"}></Button2>
          <Button2 content={"Quick View"}></Button2>
        </div>
      </div>
    </div>
  );
}
