import { useAuthContext } from "./useAuthContext";
import { useQuestionsContext } from "./useQuestionsContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchQ } = useQuestionsContext();
  const navigate = useNavigate();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchQ({ type: "SET_QUESTIONS", payload: null });
    navigate("/login");
  };

  return { logout };
};
