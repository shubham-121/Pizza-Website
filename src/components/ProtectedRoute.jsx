import { useNavigate } from "react-router";
import { useUser } from "../supabase/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1 Load the authenticated user
  const { isLoading, user, isAuthenticated } = useUser();

  //2 If there is no authenticated user, redirect to login form
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3 While loading show a spinner
  if (isLoading) return <Spinner></Spinner>;

  //4 if there is a user render the app

  if (isAuthenticated) return children;
}
