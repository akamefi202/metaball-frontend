/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const SYSLOG_API_URL = `admin/syslog`;

export const getSyslog = (params) => {
  return api.get(
    `${SYSLOG_API_URL}/?limit=${params.limit}&skip=${params.skip}&code=${params.code}&key=${params.key}&type=${params.type}&action=${params.action}`
  );
};
