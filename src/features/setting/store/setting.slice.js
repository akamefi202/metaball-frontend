// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  setting: {
    count: 0,
    data: [],
    type: "",
  },
  selected: {},
  count: 0,
  error: null,
};

// slice
export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      const type = action.payload.type;
      let data = [];
      if (type === "location") {
        data = action.payload.data.locations;
      } else {
        data = action.payload.data.data;
      }
      state.setting.data = data;
      state.setting.count = action.payload.data.count;
      state.setting.type = type;
    },
    fetchOneSucceeded(state, action) {
      state.selected = action.payload.data;
    },
    actionStarted(state, action) {
      state.loading = true;
    },
    actionEnded(state, action) {
      state.loading = false;
    },
  },
});

// Actions
export const settingActions = {
  actionStarted: settingSlice.actions.actionStarted,
  actionEnded: settingSlice.actions.actionEnded,
  get: createAction(`${settingSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  create: createAction(`${settingSlice.name}/create`, (data) => ({
    payload: data,
  })),
  fetchAll: createAction(`${settingSlice.name}/fetchAll`),
  fetchAllSucceeded: settingSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: settingSlice.actions.fetchOneSucceeded,
  update: createAction(`${settingSlice.name}/update`, (data) => ({
    payload: data,
  })),
  updateStatus: createAction(`${settingSlice.name}/updateStatus`, (data) => ({
    payload: data,
  })),
  delete: createAction(`${settingSlice.name}/delete`, (data) => ({
    payload: data,
  })),
};

// Selectors
export const selectSetting = (state) => state.setting;

// Reducer
export default settingSlice.reducer;
