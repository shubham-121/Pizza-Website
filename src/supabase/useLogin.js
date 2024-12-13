import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "./apiAuth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  disableSignIn,
  failure,
  loginSuccess,
  toggleSignIn,
} from "../components/AuthSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      dispatch(loginSuccess()); //isAuth state ->true
      dispatch(toggleSignIn()); //isSignedIn state->true
      dispatch(disableSignIn()); //disabled state->true
      navigate("/menu");
    },
    onError: (err) => {
      dispatch(failure()); //isAuth state ->false
      console.error(err.message);
      throw new Error("Problem in logging in the user", err);
    },
  });

  return { login, isLoading };
}
