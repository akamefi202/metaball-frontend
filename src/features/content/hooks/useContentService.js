import { useCallback } from "react";

import { contentActions, selectContent } from "features/content/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Content Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useContentService = () => {
  const dispatch = useAppDispatch();

  return {
    content: useAppSelector(selectContent),
    get: useCallback(
      (data) => {
        dispatch(contentActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    createContent: useCallback(
      (data) => {
        dispatch(contentActions.create(data));
      },
      [dispatch]
    ),
    fetchAllContents: useCallback(
      (data) => {
        dispatch(contentActions.fetchAll(data));
      },
      [dispatch]
    ),
    deleteContent: useCallback(
      (data) => {
        dispatch(contentActions.delete(data));
      },
      [dispatch]
    ),
    updateContent: useCallback(
      (data) => {
        dispatch(contentActions.update(data));
      },
      [dispatch]
    ),
    updateStatus: useCallback(
      (data) => {
        dispatch(contentActions.updateStatus(data));
      },
      [dispatch]
    ),
  };
};
