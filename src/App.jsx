import "./App.css";
import "./styles/custom-slick.css";
import Header from "./components/Header";
import MiddleBody from "./components/MiddleBody";
import Footer from "./components/Footer";
import AboutUs from "./components/ABoutUs";
import Menu from "./components/Menu";
import ContactUs from "./components/ContactUs";
import Homepage from "./components/Homepage";
import Cart from "./components/Cart";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import SignIn from "./components/SignIn";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage></Homepage>,
    },
    {
      path: "/menu",
      element: <Menu></Menu>,
      children: [
        {
          index: true,
          element: <Header></Header>, //render the header on menu page also
        },
      ],
    },
    {
      path: "/contact",
      element: <ContactUs></ContactUs>,
      children: [
        {
          index: true,
          element: <Header></Header>, //render the header on menu page also
        },
      ],
    },
    {
      path: "/about",
      element: <AboutUs></AboutUs>,
      children: [
        {
          index: true,
          element: <Header></Header>, //render the header on menu page also
        },
      ],
    },
    {
      path: "/signin",
      element: <SignIn></SignIn>,
      children: [
        {
          index: true,
          element: <Header></Header>, //render the header on menu page also
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
