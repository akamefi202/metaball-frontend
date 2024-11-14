import { useCallback } from "react";

import { roundingActions, selectRounding } from "features/rounding/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Rounding Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useRoundingService = () => {
  const dispatch = useAppDispatch();

  return {
    roundings: useAppSelector(selectRounding),
    getRounding: useCallback(
      (data) => {
        dispatch(roundingActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    createRounding: useCallback(
      (rounding) => {
        dispatch(roundingActions.create({ ...rounding }));
      },
      [dispatch]
    ),
    fetchAllRoundings: useCallback(
      (data) => {
        dispatch(roundingActions.fetchAll(data));
      },
      [dispatch]
    ),
    deleteRounding: useCallback(
      (data) => {
        dispatch(roundingActions.delete(data));
      },
      [dispatch]
    ),
    updateRounding: useCallback(
      (rounding) => {
        dispatch(
          roundingActions.update({
            ...rounding,
          })
        );
      },
      [dispatch]
    ),
  };
};

export default useRoundingService;
