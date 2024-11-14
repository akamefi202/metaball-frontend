/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const FOLLOWED_API_URL_USER = `admin/follow/user/to`;
const FOLLOWING_API_URL_USER = `admin/follow/user/from`;
const FOLLOWING_API_URL_ROUNDING = `admin/follow/rounding`;
const FOLLOWING_API_URL_BLOG = `admin/follow/blog`;

export const getFollowedUser = (params) => {
  return api.get(
    `${FOLLOWED_API_URL_USER}/${params.id}?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};
export const getFollowingUser = (params) => {
  return api.get(
    `${FOLLOWING_API_URL_USER}/${params.id}?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};
export const getFollowingRounding = (params) => {
  return api.get(
    `${FOLLOWING_API_URL_ROUNDING}/${params.id}?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};
export const getFollowingBlog = (params) => {
  return api.get(
    `${FOLLOWING_API_URL_BLOG}/${params.id}?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};
