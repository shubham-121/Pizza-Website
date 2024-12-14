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
import Favourites from "./components/Favourites";
import AddNewPizza from "./components/AddNewPizza";
import { action, action as CreateOrderAction } from "./components/Order";
// import { action as AddNewPizzaAction } from "./components/AddNewPizza";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import SignIn from "./components/SignIn";
import Order from "./components/Order";
import OrderSummary from "./components/OrderSummary";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

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

    {
      path: "/signup",
      element: <SignUp></SignUp>,
      children: [
        {
          index: true,
          element: <Header></Header>, //render the header on menu page also
        },
      ],
    },
    {
      path: "/cart",
      element: <Cart></Cart>,
      children: [
        {
          index: true,
          element: <Header></Header>,
        },
      ],
    },
    {
      path: "/favourites",
      element: <Favourites></Favourites>,
      children: [
        {
          index: true,
          element: <Header></Header>,
        },
      ],
    },
    {
      path: "/order",
      element: <Order></Order>,
      action: CreateOrderAction,
      children: [
        {
          index: true,
          element: <Header></Header>,
        },
      ],
    },
    {
      path: "/orderSummary",
      element: <OrderSummary></OrderSummary>,
      children: [
        {
          index: true,
          element: <Header></Header>,
        },
      ],
    },

    {
      path: "/profile",
      element: <Profile></Profile>,
      children: [
        {
          index: true,
          element: <Header></Header>,
        },
      ],
    },

    {
      path: "/addNewPizza",
      element: <AddNewPizza></AddNewPizza>,
      // action: AddNewPizzaAction,

      children: [
        {
          index: true,
          element: <Header></Header>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
