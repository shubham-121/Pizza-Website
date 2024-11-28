import { useState } from "react";
import ChickenPizza from "./../assets/chicken pizza.jpg";
import Margeritta from "./../assets/pizza margerita.jpg";
import PizzaNapoli from "./../assets/pizza napoli.jpg";
import VeggieSupreme from "./../assets/veggie supreme.jpg";

export default function MiddleBody() {
  const [defaultPizza, setDefaultPizza] = useState(ChickenPizza);
  const [title, setTitle] = useState("Meat Lovers- Chicken");
  const [description, setDescription] = useState(
    "Rich tomato sauce base topped with cream cheese,onions,green chilli..."
  );
  const [cost, setCost] = useState("");

  return (
    <div className="border-black border-solid border-2 min-h-[80vh] flex">
      <div className="px-8 mt-4">
        <p className="text-3xl text-red-600">Today's Special Pizza!</p>
        <br></br>
        <h4 className="text-3xl italic font-bold">{title}</h4>
        <h6 className="text-2xl text-stone-500 italic"> {description}</h6>
        <div className="flex">
          <img
            src={ChickenPizza}
            className="max-h-[24vh] rounded-[100px] hover:scale-110"
            onClick={() => {
              setDefaultPizza(ChickenPizza);
              setTitle("Meat Lovers- Chicken");
              setDescription(
                "Rich tomato sauce base topped with cream cheese,onions,green chilli..."
              );
              setCost("450");
            }}
          ></img>
          <img
            src={Margeritta}
            className="max-h-[24vh] min-w-[11vw] rounded-[100px] hover:scale-110"
            onClick={() => {
              setDefaultPizza(Margeritta);
              setTitle("Cheese Lovers- Margherita ");
              setDescription(
                "A thin crust topped with tomato sauce, mozzarella cheese, and basil leaves...."
              );
              setCost("350");
            }}
          ></img>
          <img
            src={PizzaNapoli}
            className="max-h-[24vh] min-w-[1vw] rounded-[100px] hover:scale-110"
            onClick={() => {
              setDefaultPizza(PizzaNapoli);
              setTitle("Thin Crust- Napoli");
              setDescription(
                "A thin crust with fresh basil and mozzarella, olive oil, tomatoes, and a simple wheat dough...."
              );
              setCost("300");
            }}
          ></img>
          <img
            src={VeggieSupreme}
            className="max-h-[24vh] min-w-[11vw] rounded-[100px] hover:scale-110"
            onClick={() => {
              setDefaultPizza(VeggieSupreme);
              setTitle("Vegitable Lovers- Veggie Supreme");
              setDescription(
                "A supreme combination of Black Olives, Green Capsicum, Mushroom, Onion, spicy Red Paprika & juicy Sweet Corn...."
              );
              setCost("250");
            }}
          ></img>
        </div>
        <div className="flex justify-center items-center space-x-8 ">
          <button className="bg-red-300 h-10 w-[10vw] rounded-[20px]">
            Customize order
          </button>
          <button className="bg-red-300 h-10 w-[10vw] rounded-[20px]">
            {cost ? `Cost- ₹${cost}/-` : `Select A Pizza Fast`}
            {/* Cost- ₹{cost}/- */}
          </button>
        </div>
      </div>
      <div>
        <img
          src={defaultPizza}
          //   className="max-h-[80vh] rounded-[300px] px-20 min-w-[40vw]"
          className={
            defaultPizza === "Margeritta"
              ? "max-h-[80vh] rounded-[300px] px-20"
              : "max-h-[75vh] rounded-[300px] px-20 min-w-[45vw]"
          }
        ></img>
      </div>
    </div>
  );
}
