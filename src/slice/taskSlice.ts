import type { ApiErrorResponse, Task, TaskState } from "@/utils/types";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Fetch tasks thunk
export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/get-task`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      const message =
        error.response?.data.errors?.join(", ") ||
        error.response?.data.message ||
        "Network error";
      return rejectWithValue(message);
    }
  }
);

// Create task thunk
export const createTask = createAsyncThunk<Task, Partial<Task>>(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/tasks`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      const message =
        error.response?.data.errors?.join(", ") ||
        error.response?.data.message ||
        "Network error";
      return rejectWithValue(message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;
