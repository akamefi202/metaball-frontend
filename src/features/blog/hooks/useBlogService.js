import { useCallback } from "react";

import { blogActions, selectBlog } from "features/blog/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Blog Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useBlogService = () => {
  const dispatch = useAppDispatch();

  return {
    blog: useAppSelector(selectBlog),
    getBlog: useCallback(
      (data) => {
        dispatch(blogActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    createBlog: useCallback(
      (data) => {
        dispatch(blogActions.create({ ...data }));
      },
      [dispatch]
    ),
    fetchAllBlogs: useCallback(
      (data) => {
        dispatch(blogActions.fetchAll(data));
      },
      [dispatch]
    ),
    fetchReviews: useCallback(
      (data) => {
        dispatch(blogActions.fetchReviews(data));
      },
      [dispatch]
    ),
    deleteBlog: useCallback(
      (data) => {
        dispatch(blogActions.delete(data));
      },
      [dispatch]
    ),
    deleteReview: useCallback(
      (data) => {
        dispatch(blogActions.deleteReview(data));
      },
      [dispatch]
    ),
    updateBlog: useCallback(
      (data) => {
        dispatch(
          blogActions.update({
            ...data,
          })
        );
      },
      [dispatch]
    ),
  };
};

export default useBlogService;
