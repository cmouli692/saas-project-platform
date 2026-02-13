import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, createTask, deleteTask } from "../../api/taskApi";

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await getTasks(projectId);
      return res.data; // array of projects
    } catch (err) {
      console.log("FETCH TASKS ERROR", err);
      console.log("FETCH TASKS ERROR RESPONSE", err.response);
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch projects",
      );
    }
  },
);

export const addTask = createAsyncThunk(
  "tasks/add",
  async ({ projectId, title }, { rejectWithValue }) => {
    try {
      const res = await createTask({ projectId, title });
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to add task");
    }
  },
);

export const removeTask = createAsyncThunk(
  "tasks/remove",
  async ({ projectId, taskId }, { rejectWithValue }) => {
    try {
      await deleteTask(projectId, taskId);
      return taskId;
    } catch (err) {
      return rejectWithValue("Failed to delete task");
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
