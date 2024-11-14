/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const DASHBOARD_URL = `/admin/dashboard`;

export const getDashboardInfo = () => api.get(DASHBOARD_URL);
