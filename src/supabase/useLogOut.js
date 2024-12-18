import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "./apiAuth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut, toggleSignOut } from "../components/AuthSlice";
import { clearOrders } from "../components/OrderSlice";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: userLogout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(toggleSignOut());
      dispatch(logOut()); //isAuth->false
      dispatch(clearOrders());
      queryClient.removeQueries(); //remove the user from the RQ cache
      navigate("/signin", { replace: true }); //disable the back button in the browser
    },
  });

  return { userLogout, isLoading };
}
