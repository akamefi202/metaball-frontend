import { useCallback } from "react";

import { supportActions, selectSupport } from "features/support/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Support custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useSupportService = () => {
  const dispatch = useAppDispatch();

  return {
    support: useAppSelector(selectSupport),
    get: useCallback(
      (data) => {
        dispatch(supportActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    createSupport: useCallback(
      (data) => {
        dispatch(supportActions.create(data));
      },
      [dispatch]
    ),
    fetchAllSupports: useCallback(
      (data) => {
        dispatch(supportActions.fetchAll(data));
      },
      [dispatch]
    ),
    deleteSupport: useCallback(
      (data) => {
        dispatch(supportActions.delete(data));
      },
      [dispatch]
    ),
    updateSupport: useCallback(
      (data) => {
        dispatch(supportActions.update(data));
      },
      [dispatch]
    ),
  };
};
