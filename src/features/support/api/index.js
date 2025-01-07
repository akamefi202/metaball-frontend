/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const getSupportBaseURL = (params) => {
  return "admin/prime";
};

export const getSupports = (params) => {
  const SURPPORT_BASE_URL = getSupportBaseURL(params);
  console.info(SURPPORT_BASE_URL, params);
  return api.get(
    `${SURPPORT_BASE_URL}/?&limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const getSupport = (params) => {
  const SURPPORT_BASE_URL = getSupportBaseURL(params);
  return api.get(`${SURPPORT_BASE_URL}/${params.id.id}`);
};

export const createSupport = (data) => {
  const SURPPORT_BASE_URL = getSupportBaseURL(data);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  // formData.append("type", data.type);
  formData.append("html", data.html);
  // formData.append("sub_type", data.sub_type);
  formData.append("title", data.title);
  formData.append("files", data.files);
  return api.post(SURPPORT_BASE_URL, data, config);
};

export const updateSupport = (data) => {
  const { _id, ...rest } = data;
  const SURPPORT_BASE_URL = getSupportBaseURL(data);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  // formData.append("type", rest.type);
  formData.append("html", rest.html);
  // formData.append("sub_type", rest.sub_type);
  formData.append("title", rest.title);
  formData.append("files", rest.files);
  return api.put(`${SURPPORT_BASE_URL}/${_id}`, rest, config);
};

export const deleteSupport = (data) => {
  const SURPPORT_BASE_URL = getSupportBaseURL(data);
  const { type, ...rest } = data;
  return api.delete(`${SURPPORT_BASE_URL}`, { data: rest });
};
