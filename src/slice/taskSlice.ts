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
  message: null,
};

// Fetch tasks thunk
export const fetchTasks = createAsyncThunk<
  Task[],
  { query: string }|undefined
>("tasks/fetchTasks", async (search , { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/get-task?${search?.query}`,
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
});

// Create task thunk
export const createTask = createAsyncThunk<
  { task: Task; message: string },
  Partial<Task>
>("tasks/createTask", async (taskData, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/create-task`,
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
});

// Delete task by ids
export const SoftDeleteTaskByIds = createAsyncThunk<
  { ids: string[]; message: string },
  string[]
>("tasks/SoftDeleteTaskByIds", async (ids, { rejectWithValue }) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/soft-delete`,
      ids,
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
});

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
      .addCase(
        createTask.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // delete task
      .addCase(SoftDeleteTaskByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        SoftDeleteTaskByIds.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(SoftDeleteTaskByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;
