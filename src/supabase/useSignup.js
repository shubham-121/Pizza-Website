import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signUp as signUpApi } from "./apiAuth";
import { confirmEmail } from "../components/AuthSlice";

export function useSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      dispatch(confirmEmail());
      alert(
        "Successfully created the user, check your email for confirmation",
        user
      );
    },

    onError: (err) => {
      alert("Problem in creating the user", err);
    },
  });

  return { signup, isLoading };
}
