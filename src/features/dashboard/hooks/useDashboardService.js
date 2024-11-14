import { useCallback } from "react";

import { dashboardActions, selectDashboard } from "features/dashboard/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * PostService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useDashboardService = () => {
  const dispatch = useAppDispatch();

  return {
    data: useAppSelector(selectDashboard),

    getDashboardInfo: useCallback(() => {
      dispatch(dashboardActions.getDashboardInfo());
    }, [dispatch]),
  };
};
