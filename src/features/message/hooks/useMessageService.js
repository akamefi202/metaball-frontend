import { useCallback } from "react";

import { messageActions, selectMessage } from "features/message/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Message Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useMessageService = () => {
  const dispatch = useAppDispatch();

  return {
    message: useAppSelector(selectMessage),

    fetchUserMessage: useCallback(
      (payload) => {
        dispatch(messageActions.fetchUserMessage(payload));
      },
      [dispatch]
    ),
    fetchClubMessage: useCallback(
      (payload) => {
        dispatch(messageActions.fetchClubMessage(payload));
      },
      [dispatch]
    ),
  };
};

export default useMessageService;
