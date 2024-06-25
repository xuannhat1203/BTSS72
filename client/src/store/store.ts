import reducerUser from "./reducers/user";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    user: reducerUser,
  },
});
