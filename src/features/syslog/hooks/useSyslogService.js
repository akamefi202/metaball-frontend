import { useCallback } from "react";

import { syslogActions, selectSyslog } from "features/syslog/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * System logging Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useSyslogService = () => {
  const dispatch = useAppDispatch();

  return {
    syslog: useAppSelector(selectSyslog),

    fetchAllSyslog: useCallback(
      (payload) => {
        dispatch(syslogActions.fetchAll(payload));
      },
      [dispatch]
    ),
  };
};

export default useSyslogService;
