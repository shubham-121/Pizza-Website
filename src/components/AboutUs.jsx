import { Outlet } from "react-router";

export default function AboutUs() {
  return (
    <div>
      <Outlet></Outlet>
      <h2>This is the about page</h2>
    </div>
  );
}
