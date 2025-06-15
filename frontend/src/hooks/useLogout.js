import { useAuthContext } from "./useAuthContext";
import { useQuestionsContext } from "./useQuestionsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchQ } = useQuestionsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchQ({ type: "SET_QUESTIONS", payload: null });
  };

  return { logout };
};
