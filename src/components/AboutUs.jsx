import { Outlet, useNavigate } from "react-router";

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <div>
      <Outlet></Outlet>
      <div className="mt-5 ml-5 px-3 border-2 border-black border-solid min-h-[40vh] max-w-[50vw]">
        <h2>This is the about page</h2>
      </div>
    </div>
  );
}
