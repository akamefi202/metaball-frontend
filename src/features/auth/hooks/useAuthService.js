import { useCallback } from "react";

import { authActions, selectAuth } from "features/auth/store";
import { useAppDispatch, useAppSelector } from "store/hooks";
// import { useNavigate } from "react-router-dom";

/**
 * PostService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useAuthService = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  return {
    data: useAppSelector(selectAuth),

    signin: useCallback(
      (data) => {
        dispatch(
          authActions.loginRequest({
            email: data.email,
            password: data.password,
          })
        );
      },
      [dispatch]
    ),
    verifyToken: useCallback(
      (data) => {
        dispatch(
          authActions.verifyToken({
            token: data.token,
          })
        );
      },
      [dispatch]
    ),
    logout: useCallback(() => {
      dispatch(authActions.logout());
      // navigate("auth/login");
    }, [dispatch]),
  };
};
