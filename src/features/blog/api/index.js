/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const BLOG_BASE_URL = `admin/blog`;
const REVIEW_BASE_URL = "admin/review";
export const getBlogs = (params) => {
  return api.get(
    `${BLOG_BASE_URL}/?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const getReviews = (params) => {
  return api.get(
    `${REVIEW_BASE_URL}/${params.id}?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const getBlog = (params) => {
  return api.get(`${BLOG_BASE_URL}/${params.id.id}`);
};

export const updateBlog = (data) =>
  api.put(`${BLOG_BASE_URL}/${data.id}`, data);

export const deleteBlog = (data) =>
  api.delete(`${BLOG_BASE_URL}`, { data: data });

export const deleteReview = (data) => {
  return api.delete(`${REVIEW_BASE_URL}`, { data: data });
};
