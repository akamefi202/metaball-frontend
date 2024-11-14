import { useCallback } from "react";

import { followActions, selectFollow } from "features/following/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Follow Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useFollowService = () => {
  const dispatch = useAppDispatch();

  return {
    follow: useAppSelector(selectFollow),

    fetchUserFollowed: useCallback(
      (payload) => {
        dispatch(followActions.fetchUserFollowed(payload));
      },
      [dispatch]
    ),
    fetchUserFollowing: useCallback(
      (payload) => {
        dispatch(followActions.fetchUserFollowing(payload));
      },
      [dispatch]
    ),
    fetchRoundFollowing: useCallback(
      (payload) => {
        dispatch(followActions.fetchRoundFollowing(payload));
      },
      [dispatch]
    ),
    fetchBlogFollowing: useCallback(
      (payload) => {
        dispatch(followActions.fetchBlogFollowing(payload));
      },
      [dispatch]
    ),
  };
};

export default useFollowService;
