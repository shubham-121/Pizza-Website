import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    isAuthenticated,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  console.log(isLoading, user, isAuthenticated);

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
