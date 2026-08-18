import { createSlice } from "@reduxjs/toolkit";
export const currentProjectSlice = createSlice({
  name: "currentProjectReducer",
  initialState: {
   data:null
  },
  reducers: {
    addCurrentProject: (state, action) => {
      state.data = action.payload;
    },
    removeCurrentProject: (state, action) => {
      state.data=null;
    },
   
  },
});
// Action creators
export const {
    addCurrentProject,
    removeCurrentProject

} = currentProjectSlice.actions;
export default currentProjectSlice.reducer;
