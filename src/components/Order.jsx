import { Outlet } from "react-router";
import Button from "./Button";
import Button2 from "./Button2";

export default function Order() {
  return (
    <div>
      <Outlet></Outlet>
      <div>
        <p className="text-center text-xl font-semibold italic">
          Confirm Your Order By Entering The Required Details.
        </p>
        <form className="mt-2  border-2 border-stone-400 border-solid h-[70vh] max-w-[100%] ">
          <div className="flex justify-center border-2 border-black  mt-8 items-center space-y-8 flex-col">
            <div className=" flex mt-4  flex-row space-x-10 justify-center items-center">
              <span className=" text-xl font-semibold italic text-center border-2 min-w-[20vw]">
                Name:
              </span>
              <input
                type="text"
                placeholder="Enter Your Name"
                required
                className="min-w-[30vw] min-h-[8vh] border-2 border-black border-solid rounded-full text-center"
              ></input>
            </div>

            <div className="flex  flex-row space-x-10 justify-center items-center">
              <span className="text-center text-xl font-semibold italic border-2 min-w-[20vw]">
                Address:
              </span>
              <input
                type="text"
                placeholder="Enter Your Address"
                required
                className="min-w-[30vw] min-h-[8vh]  border-2  border-black border-solid rounded-full text-center"
              ></input>
            </div>

            <div className="flex  flex-row space-x-10 justify-center items-center">
              <span className="text-center text-xl font-semibold italic border-2 min-w-[20vw]">
                Phone Number:
              </span>
              <input
                type="text"
                placeholder="Enter Your Phone Number"
                required
                className="min-w-[30vw] min-h-[8vh] border-2 border-black border-solid rounded-full text-center"
              ></input>
            </div>

            <div className="flex  flex-row space-x-10 justify-center items-center">
              <span className="text-center text-xl font-semibold italic border-2 min-w-[20vw]">
                Email:
              </span>
              <input
                type="text"
                placeholder="Enter Your Email"
                required
                className="min-w-[30vw] min-h-[8vh] border-2 border-black border-solid rounded-full text-center"
              ></input>
            </div>
            <div className="flex flex-row justify-center items-center space-x-16">
              <Button2 style={{ marginLight: "40px" }} content={"Submit"}>
                {" "}
              </Button2>
              <Button2 content={"Cancel"}> </Button2>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
