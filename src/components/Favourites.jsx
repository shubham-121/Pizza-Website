import { Outlet } from "react-router";

export default function Favourites() {
  return (
    <div>
      <Outlet></Outlet>
      <p>This is the favourites page!</p>
    </div>
  );
}
