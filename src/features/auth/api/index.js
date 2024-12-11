/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const SIGNIN_URL = `/admin/login`;
const VERIFY_TOKEN_URL = "admin/verify";

export const signin = (data) => api.post(SIGNIN_URL, data);

export const verifyToken = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return api.get(VERIFY_TOKEN_URL, config);
};
