import { configureStore } from "@reduxjs/toolkit";
import adminSidebarSlice from "../features/sidebar/adminSidebarSlice";
import  userReducer from "../features/user/userSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";


export const store = configureStore({
  reducer: {
    sidebar: adminSidebarSlice,
    user: userReducer,
    usersidebar: sidebarReducer
  },
});
