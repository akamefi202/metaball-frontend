import { useCallback } from "react";

import { courseActions, selectCourse } from "features/course/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

/**
 * Course Service custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useCourseService = () => {
  const dispatch = useAppDispatch();

  return {
    courses: useAppSelector(selectCourse),
    getCourse: useCallback(
      (data) => {
        dispatch(courseActions.get({ id: data.id }));
      },
      [dispatch]
    ),
    createCourse: useCallback(
      (data) => {
        dispatch(courseActions.create({ ...data }));
      },
      [dispatch]
    ),
    fetchAllCourses: useCallback(
      (data) => {
        dispatch(courseActions.fetchAll(data));
      },
      [dispatch]
    ),
    deleteCourse: useCallback(
      (data) => {
        dispatch(courseActions.delete(data));
      },
      [dispatch]
    ),
    updateCourse: useCallback(
      (data) => {
        dispatch(
          courseActions.update({
            ...data,
          })
        );
      },
      [dispatch]
    ),
  };
};

export default useCourseService;
