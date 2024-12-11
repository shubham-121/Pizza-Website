import { useState } from "react";
import { Outlet } from "react-router";

export default function SignIn() {
  return (
    <div>
      <Outlet></Outlet>
      <h2 className="text-center mt-8 text-xl italic font-semibold">
        Sign In/Log In
      </h2>
      <LogInForm className=""></LogInForm>
    </div>
  );
}

function LogInForm() {
  const [email, setEmail] = useState("xyz@123.com");
  const [pswd, setPswd] = useState(12345678);

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePswd(e) {
    setPswd(e.target.value);
  }
  return (
    <div className="flex justify-center items-center mt-2">
      <form className=" border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg w-full max-w-md">
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
            value={pswd}
            onChange={handlePswd}
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
