import { useCallback } from "react";

import { adminActions, selectAdmin } from "features/admin/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * AdminService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useAdminService = () => {
  const dispatch = useAppDispatch();

  return {
    admin: useAppSelector(selectAdmin),

    createAdmin: useCallback(
      (data) => {
        dispatch(
          adminActions.create({ email: data.email, password: data.password })
        );
      },
      [dispatch]
    ),
    getAdmin: useCallback(
      (data) => {
        dispatch(adminActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    fetchAllAdmins: useCallback(
      (params) => {
        dispatch(adminActions.fetchAll(params));
      },
      [dispatch]
    ),
    deleteAdmin: useCallback(
      (data) => {
        dispatch(adminActions.delete(data));
      },
      [dispatch]
    ),
    updateAdmin: useCallback(
      (data) => {
        dispatch(
          adminActions.update({
            id: data.id,
            email: data.email,
            password: data.password,
          })
        );
      },
      [dispatch]
    ),
  };
};

export default useAdminService;
