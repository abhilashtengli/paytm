import { createSlice } from "@reduxjs/toolkit";

const bulkUserSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    addAllUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { addAllUsers } = bulkUserSlice.actions;

export default bulkUserSlice.reducer;
