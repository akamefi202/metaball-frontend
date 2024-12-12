/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const COURSE_BASE_URL = `admin/golfcourse`;

export const getCourses = (params) => {
  return api.get(
    `${COURSE_BASE_URL}/?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const getCourse = (params) =>
  api.get(`${COURSE_BASE_URL}/${params.id.id}`);

export const createCourse = (data) => api.post(COURSE_BASE_URL, data);

export const updateCourse = (data) =>
  api.put(`${COURSE_BASE_URL}/${data.id}`, data);

export const deleteCourse = (data) =>
  api.delete(`${COURSE_BASE_URL}`, { data: data });
