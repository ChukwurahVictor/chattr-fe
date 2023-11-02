import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";
import urls from "@/services/axios/urls";

type AuthState = {
  status: string;
  data: {
    accessToken: string
    user: {
      id: string;
      email: string
      firstName: string
      lastName: string
      displayName: string
      followedBy?: [{ id: string, firstName: string, lastName: string, displayName: string }]
      following?: [{ id: string, firstName: string, lastName: string, displayName: string }]
    };
  };
  httpError: any;
  isLoggedIn: boolean;
};


export interface RegisterUserPayloadType {
  firstName: string;
  lastName: string;
  password: string;
}

export interface SigninPayloadType {
  email: string;
  password: string;
}
export interface SignupPayloadType {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: AuthState = {
 status: "idle",
  data: {
    accessToken: "",
    user: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      displayName: "",
      followedBy: [{id: "", firstName: "", lastName: "", displayName: "" }],
      following: [{id: "", firstName: "", lastName: "", displayName: "" }],
    },
  },
  httpError: null,
  isLoggedIn: false,
}

export const registerUserService = async (data: RegisterUserPayloadType) => 
    axios.post(`${urls.signup}`, data);

export const signinService = async (data: SigninPayloadType) => 
    axios.post(`${urls.login}`, data);

export const signoutService = () => 
    axios.post(`${urls.logout}`);


export const registerUserAsync = createAsyncThunk(
  "auth/register",
  async (payload: RegisterUserPayloadType, thunkAPI) => {
    try {
      const response = await registerUserService(payload);
      return response.data;
    } catch (err: any) {
      let error: AxiosError = err;
      if (!error.response) throw err;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signinAsync = createAsyncThunk(
  `${urls.login}`,
  async (payload: SigninPayloadType, thunkAPI) => {
    try {
      const response = await signinService(payload);
      return response.data;
    } catch (err: any) {
      let error: AxiosError = err;
      if (!error.response) throw err;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signoutAsync = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await signoutService();
      return response.data;
    } catch (err: any) {
      let error: AxiosError = err;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    loginDispatch: (state, { payload }) => {
      state.isLoggedIn = true;
      state.data = payload;
    },
    logoutDispatch: (state) => {
      state.isLoggedIn = false;
      state.data = {
        accessToken: "",
        user: {
          id: "",
          email: "",
          firstName: "",
          lastName: "",
          displayName: "",
        }
      };
    },
  },
  extraReducers: builder => {
    builder
      // The `signin` action is handled by the `signinAsync` thunk.
      .addCase(signinAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.httpError = action.payload;
          return;
        }
        state.httpError = action.error;
      })

      .addCase(registerUserAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.httpError = action.payload;
          return;
        }
        state.httpError = action.error;
      });
  },
});

export const {
  loginDispatch,
  logoutDispatch,
  reset,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
