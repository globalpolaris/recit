import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../adapters/AxiosInstance";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await instance.post(`/user/login`, {
        username: username,
        password: password,
      });
      let data = await response.json();
      console.log("response", data);
      if (response.status === 200) {
        localStorage.setItem("token", data.accessToken);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: "",
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.username = payload.username;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = userSlice.actions;
export const userSelector = (state) => state.user;
