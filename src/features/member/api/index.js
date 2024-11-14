/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const MEMBER_BASE_URL = `admin/user`;

export const getMembers = (params) =>
  api.get(
    `${MEMBER_BASE_URL}/?limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );

export const getMember = (params) =>
  api.get(`${MEMBER_BASE_URL}/${params.id.id}`);

export const createMember = (data) => api.post(MEMBER_BASE_URL, data);

export const updateMember = (data) => {
  const { _id, ...rest } = data;
  return api.put(`${MEMBER_BASE_URL}/${_id}`, rest);
};

export const deleteMember = (data) =>
  api.delete(`${MEMBER_BASE_URL}`, { data });
