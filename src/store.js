import { configureStore, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const days = createSlice({
  name: "daysReducer",
  initialState: {
    date: moment(),
  },
  reducers: {
    changeDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { changeDate } = days.actions;

export default configureStore({ reducer: days.reducer });
