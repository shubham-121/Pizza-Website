import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "./apiAuth";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/menu");
    },
    onError: (err) => {
      console.error(err.message);
      throw new Error("Problem in logging in the user", err);
    },
  });

  return { login, isLoading };
}
