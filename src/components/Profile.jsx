import { Outlet } from "react-router";
import { useUser } from "../supabase/useUser";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../supabase/apiAuth";

export default function Profile() {
  const { isLoading, user, isAuthenticated } = useUser();

  console.log(user);

  let user_name;
  let user_email;
  let user_phoneNumber;
  //get current user details
  if (user) {
    user_name = user.user.user_metadata.name;
    user_email = user.user.user_metadata.email;
    user_phoneNumber = user.user.user_metadata.phoneNumber;
    console.log(user_name, user_phoneNumber, user_email);
  }

  return (
    <div>
      <Outlet></Outlet>
      <div>
        {user && (
          <RenderUserDetails
            user_name={user_name}
            user_email={user_email}
            user_phoneNumber={user_phoneNumber}
          ></RenderUserDetails>
        )}
      </div>
    </div>
  );
}

function RenderUserDetails({ user_name, user_email, user_phoneNumber }) {
  return (
    <div className="max-w-[30vw] mt-4 border-2 border-black border-solid flex justify-start items-start flex-col">
      <p>Name: {user_name} </p>
      <p>Email: {user_email} </p>
      <p>Phone: {user_phoneNumber} </p>
    </div>
  );
}

//ask chatgpt for this below:
//first question -> i have authenticated users in my Db, i also created a pizza-orders table to store the pizza order of the auth users. I want the pizza order to be store in the pizza table with refrencee to the auth user in supabase
//second question->do i need to create a new user table? because i cant find any way to add foreign key to the user table managed by supabse
