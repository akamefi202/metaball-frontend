/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const getContentBaseURL = (params) => {
  return "admin/content";
};

export const getContents = (params) => {
  const CONTENT_BASE_URL = getContentBaseURL(params);
  return api.get(
    `${CONTENT_BASE_URL}/?${
      params.type === "location" ? "" : "type=" + params.type
    }&limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const getContent = (params) => {
  const CONTENT_BASE_URL = getContentBaseURL(params);
  return api.get(`${CONTENT_BASE_URL}/${params.id.id}`);
};

export const createContent = (data) => {
  const CONTENT_BASE_URL = getContentBaseURL(data);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  formData.append("type", data.type);
  formData.append("html", data.html);
  formData.append("sub_type", data.sub_type);
  formData.append("title", data.title);
  formData.append("files", data.files);
  return api.post(CONTENT_BASE_URL, data, config);
};

export const updateContent = (data) => {
  const { _id, ...rest } = data;
  const CONTENT_BASE_URL = getContentBaseURL(data);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("type", rest.type);
  formData.append("html", rest.html);
  formData.append("sub_type", rest.sub_type);
  formData.append("title", rest.title);
  formData.append("files", rest.files);
  return api.put(`${CONTENT_BASE_URL}/${_id}`, rest, config);
};

export const updateStatus = (data) => {
  const { _id, ...rest } = data;
  const CONTENT_BASE_URL = getContentBaseURL(data);
  return api.post(`${CONTENT_BASE_URL}/${_id}`, rest);
};

export const deleteContent = (data) => {
  const CONTENT_BASE_URL = getContentBaseURL(data);
  const { type, ...rest } = data;
  return api.delete(`${CONTENT_BASE_URL}`, { data: rest });
};
