import { createSlice } from "@reduxjs/toolkit";
export const taskSlice = createSlice({
  name: "taskReducer",
  initialState: {
    task: [],
  },
  reducers: {
    userTask: (state, action) => {
      state.task = action.payload;
    },
    removeUserTask: (state) => {
      state.task = null;
    },
    addTask: (state, action) => {
      state.task.push(action.payload);
    },
    deleteTask: (state, action) => {
      const deletedTask = action.payload;
      state.task = state.task.filter((task) => {
        return task?._id !== deletedTask;
      });
    },
    updateTask: (state, action) => {
      const updateTask = action.payload;
      state.task = state.task.map((task) =>
        task?._id === updateTask._id ? updateTask : task,
      );
    },
  },
});
// Action creators
export const {
  userTask,
  removeUserTask,
  addTask,
  deleteTask,
  updateTask,

} = taskSlice.actions;
export default taskSlice.reducer;
