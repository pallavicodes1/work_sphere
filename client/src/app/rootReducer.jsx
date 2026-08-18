import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import taskReducer from "./user/taskSlice"
import projectReducer from "./user/projectSlice";
import currentProjectReducer from "./user/currentProjectSlice"
const rootReducer = combineReducers({
  userReducer: userReducer,
  taskReducer:taskReducer,
  projectReducer:projectReducer,
  currentProjectReducer:currentProjectReducer

});

export default rootReducer;