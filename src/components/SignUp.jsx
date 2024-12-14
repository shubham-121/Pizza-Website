import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { login } from "../supabase/apiAuth";
import Spinner from "./Spinner";
import { useLogin } from "../supabase/useLogin";
import { useSignUp } from "../supabase/useSignup";
import { useSelector } from "react-redux";

export default function SignUp() {
  const { login, isLoading } = useLogin(); //custom login hook
  const emailConfirm = useSelector((store) => store.authentication);

  return (
    <div>
      <Outlet></Outlet>
      <h2 className="text-center mt-8 text-xl italic font-semibold">Sign Up</h2>
      <SignUpForm className=""></SignUpForm>

      {isLoading && Loading}
      {/* <Loading></Loading> */}
    </div>
  );
}

function ConfirmEmailToast() {
  return (
    <div>
      <p>Now confirm your email!</p>
    </div>
  );
}
function Loading() {
  return (
    <div className="flex justify-center items-center animate-spin">
      <p className="font-bold text-4xl ">O</p>
    </div>
  );
}

function SignUpForm() {
  //Default user-xyz@123.com
  //Default pswd:12345678
  const [name, setName] = useState("NAME");
  const [phoneNumber, setPhoneNumber] = useState("9068728934");
  const [email, setEmail] = useState("new@123.com");
  const [password, setPassword] = useState("12345678");
  //   const { login, isLoading } = useLogin(); //custom login hook

  const { signup, isLoading } = useSignUp();
  const navigate = useNavigate();

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleName(e) {
    setName(e.target.value);
  }
  function handlePhoneNumber(e) {
    setPhoneNumber(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password || !name || !phoneNumber) {
      alert("Please enter all the fields");
      return;
    }

    console.log(name, password, email, phoneNumber);
    signup(
      { name, password, email, phoneNumber },
      {
        onSettled: () => {
          //reset all the fields
          setName("");
          setEmail("");
          setPassword("");
          setPhoneNumber("");
          navigate("/"); //redirect to homepage
        },
      }
    );

    // login({ email, password });
  }

  return (
    <div className="flex justify-center items-center mt-2">
      <form
        onSubmit={handleSubmit}
        className=" border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg w-full max-w-md"
      >
        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={handleName}
            placeholder="Enter your email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmail}
            placeholder="Enter your email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            type="name"
            id="name"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter your phone number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? "Logging In...." : "Log In"}
        </button>
      </form>
    </div>
  );
}
