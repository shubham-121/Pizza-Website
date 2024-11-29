import { Outlet } from "react-router";

export default function ContactUs() {
  return (
    <div>
      <Outlet></Outlet>
      <p>This is the contact us page! </p>
    </div>
  );
}
