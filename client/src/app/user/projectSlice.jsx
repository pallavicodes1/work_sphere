import { createSlice } from "@reduxjs/toolkit";
export const projectSlice = createSlice({
  name: "projectReducer",
  initialState: {
    asOwner: [],
    asMember: []
  },
  reducers: {
    userProjectsAsOwner: (state, action) => {
      state.asOwner = action.payload;
    },
    updateOProject: (state, action) => {
      const updateProject = action.payload;
      state.asOwner = state.asOwner.map((project) =>
        project?._id === updateProject._id ? updateProject : project,
      );
    },
    addOProject: (state, action) => {
      state.asOwner.push(action.payload);
    },
    removeOProjects: (state) => {
      state.asOwner = null;
    },
    deleteOProject: (state, action) => {
      const deletedProject = action.payload;
      state.asOwner = state.asOwner.filter((project) => {
        return project?._id !== deletedProject;
      });
    },  
    userProjectsAsMember: (state, action) => {
      state.asMember = action.payload;
    }, 
    updateMProject: (state, action) => {
      const updateProject = action.payload;
      state.asMember = state.asMember.map((project) =>
        project?._id === updateProject._id ? updateProject : project,
      );
    },
    addMProject: (state, action) => {
      state.asMember.push(action.payload);
    },
    removeMProjects: (state) => {
      state.asMember = null;
    },
    deleteMProject: (state, action) => {
      const deletedProject = action.payload;
      state.asMember = state.asOwner.filter((project) => {
        return project?._id !== deletedProject;
      });
    },
  },
});
// Action creators
export const {
  userProjectsAsOwner,
  deleteOProject,
  removeOProjects,
  addOProject,
  userProjectsAsMember,
  deleteMProject,
  removeMProjects,
  addMProject,

} = projectSlice.actions;
export default projectSlice.reducer;
