/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const CLUB_BASE_URL = `admin/club`;

export const getClubs = (params) => {
  return api.get(
    `${CLUB_BASE_URL}/?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const getClub = (params) => api.get(`${CLUB_BASE_URL}/${params.id.id}`);

export const createClub = (data) => api.post(CLUB_BASE_URL, data);

export const updateClub = (data) =>
  api.put(`${CLUB_BASE_URL}/${data.id}`, data);

export const deleteClub = (data) =>
  api.delete(`${CLUB_BASE_URL}`, { data: data });
