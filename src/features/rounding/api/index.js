/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const ROUNDING_BASE_URL = `admin/rounding`;

export const getRoundings = (params) => {
  return api.get(
    `${ROUNDING_BASE_URL}/?start_date=${params.start_date}&end_date=${params.end_date}&limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const getRounding = (params) =>
  api.get(`${ROUNDING_BASE_URL}/${params.id.id}`);

export const createRounding = (data) => api.post(ROUNDING_BASE_URL, data);

export const updateRounding = (data) =>
  api.put(`${ROUNDING_BASE_URL}/${data.id}`, data);

export const deleteRounding = (data) =>
  api.delete(`${ROUNDING_BASE_URL}`, { data: data });
