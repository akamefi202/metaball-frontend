import { useCallback } from "react";

import { serviceActions, selectService } from "features/service/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useServiceService = () => {
  const dispatch = useAppDispatch();

  return {
    service: useAppSelector(selectService),
    get: useCallback(
      (data) => {
        dispatch(serviceActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    createService: useCallback(
      (data) => {
        dispatch(serviceActions.create(data));
      },
      [dispatch]
    ),
    fetchAllServices: useCallback(
      (data) => {
        dispatch(serviceActions.fetchAll(data));
      },
      [dispatch]
    ),
    deleteService: useCallback(
      (data) => {
        dispatch(serviceActions.delete(data));
      },
      [dispatch]
    ),
    updateService: useCallback(
      (data) => {
        dispatch(serviceActions.update(data));
      },
      [dispatch]
    ),
  };
};
