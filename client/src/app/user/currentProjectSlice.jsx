import { createSlice } from "@reduxjs/toolkit";
export const currentProjectSlice = createSlice({
  name: "currentProjectReducer",
  initialState: {
   data:null,
   currentUserRole:null
  },
  reducers: {
    addCurrentProject: (state, action) => {
      state.data = action.payload;
    },
    removeCurrentProject: (state, action) => {
      state.data=null;
    },
    addUserProjectRole: (state, action) => {
      state.currentUserRole = action.payload;
    },
    removeUserProjectRole: (state, action) => {
      state.currentUserRole = null;
    },
  },
});
// Action creators
export const {
    addCurrentProject,
    removeCurrentProject,
    addUserProjectRole,
    removeUserProjectRole

} = currentProjectSlice.actions;
export default currentProjectSlice.reducer;
