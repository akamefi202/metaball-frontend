import { useCallback } from "react";

import { memberActions, selectMembers } from "features/member/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Member Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useMemberService = () => {
  const dispatch = useAppDispatch();

  return {
    members: useAppSelector(selectMembers),
    getMember: useCallback(
      (data) => {
        dispatch(memberActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    createMember: useCallback(
      (member) => {
        dispatch(memberActions.create({ ...member }));
      },
      [dispatch]
    ),
    fetchAllMembers: useCallback(
      (data) => {
        dispatch(memberActions.fetchAll(data));
      },
      [dispatch]
    ),
    deleteMember: useCallback(
      (member) => {
        dispatch(memberActions.delete(member));
      },
      [dispatch]
    ),
    updateMember: useCallback(
      (member) => {
        dispatch(
          memberActions.update({
            ...member,
          })
        );
      },
      [dispatch]
    ),
  };
};
