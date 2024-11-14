/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const getServiceBaseURL = (params) => {
  return "admin/service";
};

export const getServices = (params) => {
  const SERVICE_BASE_URL = getServiceBaseURL(params);
  return api.get(
    `${SERVICE_BASE_URL}/?${
      params.type === "location" ? "" : "type=" + params.type
    }&limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const getService = (params) => {
  const SERVICE_BASE_URL = getServiceBaseURL(params);
  return api.get(`${SERVICE_BASE_URL}/${params.id.id}`);
};

export const createService = (data) => {
  const SERVICE_BASE_URL = getServiceBaseURL(data);
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
  return api.post(SERVICE_BASE_URL, data, config);
};

export const updateService = (data) => {
  const { _id, ...rest } = data;
  const SERVICE_BASE_URL = getServiceBaseURL(data);
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
  return api.put(`${SERVICE_BASE_URL}/${_id}`, rest, config);
};

export const deleteService = (data) => {
  const SERVICE_BASE_URL = getServiceBaseURL(data);
  const { type, ...rest } = data;
  return api.delete(`${SERVICE_BASE_URL}`, { data: rest });
};
