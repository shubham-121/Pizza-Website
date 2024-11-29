import Logo from "./../assets/pizzalogo.png";
import Button from "./Button";

export default function Header() {
  return (
    <div className="bg-red-200 border-2 border-black border-solid  flex justify-between items-center">
      <div>
        <img src={Logo} className="max-h-[120px] w-[13vw]"></img>
      </div>
      <div className="flex  space-x-6   ">
        <button className="px-4 py-3 text-xl font-bold">Home</button>
        <button className="px-4 py-3 text-xl font-bold">Menu</button>
        <button className="px-4 py-3 text-xl font-bold">About</button>
        <button className="px-4 py-3 text-xl font-bold">Contact Us</button>
        <button className="px-8 py-2 text-xl font-bold bg-red-900 rounded-[50px] text-gray-100 ">
          Sign In
        </button>
        <button className="px-5 py-1 text-l font-bold bg-red-900 rounded-[50px] text-gray-100">
          My Cart🛒
        </button>
        <button className="px-5 py-1 text-l font-bold bg-red-900 rounded-[50px] text-gray-100">
          Favs💖
        </button>
      </div>
    </div>
  );
}

//   <img src={Logo} className="max-h-[100px]"></img>;
