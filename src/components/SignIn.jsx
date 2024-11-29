import { Outlet } from "react-router";

export default function SignIn() {
  return (
    <div>
      <Outlet></Outlet>
      <h2>This is the sign in page!</h2>
    </div>
  );
}
