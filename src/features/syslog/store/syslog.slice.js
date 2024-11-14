// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  syslog: {},
  count: 0,
  error: null,
};

// slice
export const syslogSlice = createSlice({
  name: "syslog",
  initialState,
  reducers: {
    fetchAllSyslogs(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.syslog = action.payload.data.syslogs;
      state.count = action.payload.data.count;
    },
  },
});

// Actions
export const syslogActions = {
  fetchAll: createAction(`${syslogSlice.name}/fetchAll`),
  fetchAllSyslogs: syslogSlice.actions.fetchAllSyslogs,
};

// Selectors
export const selectSyslog = (state) => state.syslog;

// Reducer
export default syslogSlice.reducer;
