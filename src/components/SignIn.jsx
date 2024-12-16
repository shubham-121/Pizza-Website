import { useState } from "react";
import { Link, Outlet } from "react-router";
import { login } from "../supabase/apiAuth";
import Spinner from "./Spinner";
import { useLogin } from "../supabase/useLogin";

export default function SignIn() {
  const { login, isLoading } = useLogin(); //custom login hook

  return (
    <div>
      <Outlet></Outlet>
      <h2 className="text-center mt-8 text-xl italic font-semibold">
        Sign In First
      </h2>
      <LogInForm className=""></LogInForm>
      <SignUp></SignUp>
      {isLoading && Loading}
      {/* <Loading></Loading> */}
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

function SignUp() {
  return (
    <div>
      <h2 className="text-center mt-8 text-s italic font-light text-blue-600">
        New user?<Link to="/signup"> Sign-up today</Link>
      </h2>
    </div>
  );
}

function LogInForm() {
  //Default user-xyz@123.com
  //Default pswd:12345678
  const [email, setEmail] = useState("xovabit431@lofiey.com");
  const [password, setPassword] = useState("12345678");
  const { login, isLoading } = useLogin(); //custom login hook

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login({ email, password });
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
