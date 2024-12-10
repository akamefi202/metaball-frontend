import { useCallback } from "react";

import { settingActions, selectSetting } from "features/setting/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Setting Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useSettingService = () => {
  const dispatch = useAppDispatch();

  return {
    setting: useAppSelector(selectSetting),
    get: useCallback(
      (data) => {
        dispatch(settingActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    createSetting: useCallback(
      (data) => {
        dispatch(settingActions.create(data));
      },
      [dispatch]
    ),
    fetchAllSettings: useCallback(
      (data) => {
        dispatch(settingActions.fetchAll(data));
      },
      [dispatch]
    ),
    deleteSetting: useCallback(
      (data) => {
        dispatch(settingActions.delete(data));
      },
      [dispatch]
    ),
    updateSetting: useCallback(
      (data) => {
        dispatch(settingActions.update(data));
      },
      [dispatch]
    ),
    updateStatus: useCallback(
      (data) => {
        dispatch(settingActions.updateStatus(data));
      },
      [dispatch]
    ),
  };
};
