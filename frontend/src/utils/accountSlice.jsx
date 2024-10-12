import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: null,
  reducers: {
    addAccountBalance: (state, action) => {
      return action.payload;
    },
  },
});

export const { addAccountBalance } = accountSlice.actions;

export default accountSlice.reducer;
