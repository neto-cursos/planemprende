import { createSlice} from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    addSubtask: (state, action) => {
      const { taskId, subtask } = action.payload;
      const taskIndex = state.findIndex((task) => task.id === taskId);
      state[taskIndex].subtasks.push(subtask);
    },
    updateTask: (state, action) => {
      const { id, key, value } = action.payload;
      const taskIndex = state.findIndex((task) => task.id === id);
      state[taskIndex][key] = value;
    },
    updateSubtask: (state, action) => {
      const { taskId, subtaskId, key, value } = action.payload;
      const taskIndex = state.findIndex((task) => task.id === taskId);
      const subtaskIndex = state[taskIndex].subtasks.findIndex(
        (subtask) => subtask.id === subtaskId
      );
      state[taskIndex].subtasks[subtaskIndex][key] = value;
    },
  },
});


export const {
  addTask,
  addSubtask,
  updateTask,
  updateSubtask,
} = taskSlice.actions;

export default taskSlice.reducer;