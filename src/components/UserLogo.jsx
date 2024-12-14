import { Navigate, useNavigate } from "react-router";
import user from "../assets/user.jpg";

export default function UserLogo() {
  const navigate = useNavigate();
  return (
    <div className="flex  ">
      <button
        className=" rounded-full mr-4 hover:scale-110  "
        onClick={() => navigate("/profile")}
      >
        <img
          className=" max-h-[5vh] object-cover rounded-full"
          src={user}
        ></img>
      </button>
    </div>
  );
}

// <div className="flex  space-x-6   ">
//   <button className="px-4 py-3 text-xl font-bold" onClick={() => Navigate("/")}>
//     USer logo
//   </button>
// </div>;
