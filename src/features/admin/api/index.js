/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const GET_ADMINS_URL = "/admin/manager";
const CREAT_ADMIN_URL = "/admin/manager";
const UPDATE_ADMIN_URL = "/admin/manager";
const REMOVE_ADMIN_URL = "/admin/manager";

export const getAdmin = (params) =>
  api.get(`${GET_ADMINS_URL}/${params.id.id}`);

export const getAdmins = (params) => {
  return api.get(
    `${GET_ADMINS_URL}/?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const createAdmin = (data) => api.post(CREAT_ADMIN_URL, data);
export const updateAdmin = (data) =>
  api.put(`${UPDATE_ADMIN_URL}/${data.id}`, {
    email: data.email,
    password: data.password,
  });

export const deleteAdmin = (data) => {
  return api.delete(`${REMOVE_ADMIN_URL}`, { data });
};
