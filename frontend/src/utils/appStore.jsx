import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import bulkUserReducer from "./bulkUserSlice"


const appStore = configureStore({
  reducer: {
    user: userReducer,
    allUsers: bulkUserReducer
  },
});

export default appStore;
