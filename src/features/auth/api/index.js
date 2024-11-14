/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const SIGNIN_URL = `/admin/login`;

export const signin = (data) => api.post(SIGNIN_URL, data);
