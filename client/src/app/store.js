import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/login/loginSlice";
export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
