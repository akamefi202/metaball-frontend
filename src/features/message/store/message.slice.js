// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userMessageData: { data: { messages: [] } },
  clubMessagedata: { data: { messages: [] } },
  error: null,
};

// slice
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    fetchUserMessageSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.userMessageData = action.payload;
    },
    fetchClubMessageSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.clubMessagedata = action.payload;
    },
  },
});

// Actions
export const messageActions = {
  fetchUserMessage: createAction(`${messageSlice.name}/fetchUserMessage`),
  fetchUserMessageSucceeded: messageSlice.actions.fetchUserMessageSucceeded,
  fetchClubMessage: createAction(`${messageSlice.name}/fetchClubMessage`),
  fetchClubMessageSucceeded: messageSlice.actions.fetchClubMessageSucceeded,
};

// Selectors
export const selectMessage = (state) => state.message;

// Reducer
export default messageSlice.reducer;
