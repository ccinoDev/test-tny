import { configureStore, createSlice } from "@reduxjs/toolkit";

let idData = 0;

const days = createSlice({
  name: "daysReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: idData++ });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

export const { add, remove } = days.actions;

export default configureStore({ reducer: days.reducer });
