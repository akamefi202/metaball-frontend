/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const MESSAGE_API_URL_USER = `admin/message/dm`;
const MESSAGE_API_URL_CLUB = `admin/message/club`;

export const getUserMessage = (params) => {
  return api.get(
    `${MESSAGE_API_URL_USER}/${params.id}?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};
export const getClubMessage = (params) => {
  return api.get(
    `${MESSAGE_API_URL_CLUB}/${params.id}?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};
