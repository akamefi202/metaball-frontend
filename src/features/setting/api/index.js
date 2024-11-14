/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const getSettingBaseURL = (params) => {
  let SETTING_BASE_URL = "";
  if (params.type === "location") {
    SETTING_BASE_URL = "/admin/location";
  } else {
    SETTING_BASE_URL = "/admin/settings";
  }
  return SETTING_BASE_URL;
};

export const getSettings = (params) => {
  const SETTING_BASE_URL = getSettingBaseURL(params);
  return api.get(
    `${SETTING_BASE_URL}/?${
      params.type === "location" ? "" : "type=" + params.type
    }&limit=${params.limit}&skip=${params.skip}&key=${params.key}`
  );
};

export const getSetting = (params) => {
  const SETTING_BASE_URL = getSettingBaseURL(params);
  return api.get(`${SETTING_BASE_URL}/${params.id.id}`);
};

export const createSetting = (data) => {
  const SETTING_BASE_URL = getSettingBaseURL(data);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  if (data.type !== "location") {
    return api.post(SETTING_BASE_URL, data);
  } else {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("files", data.files);
    return api.post(SETTING_BASE_URL, data, config);
  }
};

export const updateSetting = (data) => {
  const { _id, ...rest } = data;
  const SETTING_BASE_URL = getSettingBaseURL(data);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  if (data.type !== "location") {
    return api.put(`${SETTING_BASE_URL}/${_id}`, rest);
  } else {
    return api.put(`${SETTING_BASE_URL}/${_id}`, rest, config);
  }
};

export const deleteSetting = (data) => {
  const SETTING_BASE_URL = getSettingBaseURL(data);
  const { type, ...rest } = data;
  return api.delete(`${SETTING_BASE_URL}`, { data: rest });
};
