import { useCallback } from "react";

import { clubActions, selectClub } from "features/club/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Club Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useClubService = () => {
  const dispatch = useAppDispatch();

  return {
    clubs: useAppSelector(selectClub),
    getClub: useCallback(
      (data) => {
        dispatch(clubActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    createClub: useCallback(
      (data) => {
        dispatch(clubActions.create({ ...data }));
      },
      [dispatch]
    ),
    fetchAllClubs: useCallback(
      (data) => {
        dispatch(clubActions.fetchAll(data));
      },
      [dispatch]
    ),
    deleteClub: useCallback(
      (data) => {
        dispatch(clubActions.delete(data));
      },
      [dispatch]
    ),
    updateClub: useCallback(
      (data) => {
        dispatch(
          clubActions.update({
            ...data,
          })
        );
      },
      [dispatch]
    ),
  };
};

export default useClubService;
