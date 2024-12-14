import { useNavigate } from "react-router";
import Logo from "./../assets/pizzalogo.png";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useLogOut } from "../supabase/useLogOut";
import UserLogo from "./UserLogo";

export default function Header() {
  const navigate = useNavigate();
  const { isOrdered } = useSelector((store) => store.cart);
  console.log(isOrdered);

  const { isSignedIn, disabled, isAuth } = useSelector(
    (store) => store.authentication
  );

  const { userLogout, isLoading } = useLogOut();

  return (
    <div className=" bg-red-200 border-2 border-black border-solid  flex justify-between items-center">
      <div>
        <img
          src={Logo}
          className="max-h-[120px] w-[13vw] cursor-pointer"
          onClick={() => navigate("/")}
        ></img>
      </div>

      {/* {isAuth && <UserLogo></UserLogo>} */}

      <div className="flex  space-x-6   ">
        <button
          className="px-4 py-3 text-xl font-bold"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="px-4 py-3 text-xl font-bold"
          onClick={() => navigate("/menu")}
        >
          Menu
        </button>
        <button
          className="px-4 py-3 text-xl font-bold"
          onClick={() => navigate("/about")}
        >
          About
        </button>
        <button
          className="px-4 py-3 text-xl font-bold"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </button>
        {isSignedIn === "Sign In" ? (
          <button
            className="px-8 py-2 text-xl font-bold bg-red-900 rounded-[50px] text-gray-100 hover:scale-105"
            onClick={() => navigate("/signin")}
          >
            {isSignedIn}
          </button>
        ) : (
          <button
            className="px-8 py-2 text-xl font-bold bg-red-900 rounded-[50px] text-gray-100 "
            onClick={() => userLogout()}
          >
            LogOut ➡️
          </button>
        )}

        {isOrdered && (
          <button
            className="hover:scale-90 px-2 py-2  font-semibold bg-red-900 rounded-[50px] text-gray-100 "
            onClick={() => navigate("/orderSummary")}
          >
            Preparing Your Order!
          </button>
        )}

        <button
          className="px-5 py-1 text-l font-bold bg-red-900 rounded-[50px] text-gray-100"
          onClick={() => navigate("/cart")}
        >
          My Cart🛒
        </button>
        <button
          className="px-5 py-1 text-l font-bold bg-red-900 rounded-[50px] text-gray-100"
          onClick={() => navigate("/favourites")}
        >
          Favs💖
        </button>

        {isAuth && <UserLogo></UserLogo>}
      </div>
    </div>
  );
}

//   <img src={Logo} className="max-h-[100px]"></img>;
