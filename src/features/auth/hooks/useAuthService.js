import { useCallback } from "react";

import { authActions, selectAuth } from "features/auth/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * PostService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useAuthService = () => {
  const dispatch = useAppDispatch();

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
    logout: useCallback(() => {
      dispatch(authActions.logout());
    }, [dispatch]),
  };
};
