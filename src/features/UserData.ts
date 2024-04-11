import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { UserStore, UserDataType } from "../app/types";
import { userLogin, userSignUp, removeUserLogin } from "../app/db";
import Cookies from 'js-cookie';

const currentUser: string = String(Cookies.get("firebase_user"));
const initialState: UserStore = {
  login: false,
  error: false,
  user: ""
};

export const signUp = createAsyncThunk(
  "UserData/signUp",
  async (user: UserDataType) => {
    const response = userSignUp(user.user, user.password);
    return response;
  }
);

export const login = createAsyncThunk(
  "UserData/login",
  async (user: UserDataType) => {
    const response = userLogin(user.user, user.password);
    return response;
  }
);

export const logout = createAsyncThunk(
  "UserData/logout",
  async () => {
    const response = removeUserLogin();
    return response;
  }
);

export const UserDataSlice = createSlice({
  name: "UserData",
  initialState: initialState,
  reducers: {
    setUserStatusSlice: (state, action) => {
      state.login = action.payload.login;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.login = true;
      state.error = false;
      if (action.payload) {
        if (action.payload.email) state.user = action.payload.email;
        Cookies.set('firebase_user', state.user, { expires: 90 });
      }
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.login = true;
      state.error = false;
      if (action.payload) {
        if (action.payload.email) state.user = action.payload.email;
        Cookies.set('firebase_user', state.user, { expires: 90 });
      }
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.login = false;
      state.error = false;
      state.user = "";
      Cookies.remove('firebase_user');
    });
    builder.addCase(login.rejected, (state) => {
      state.login = false;
      state.error = true;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.login = false;
      state.error = true;
    });
    builder.addCase(logout.rejected, (state) => {
      state.login = true;
      state.error = true;
    });
    builder.addCase(login.pending, (state) => {
    });
    builder.addCase(signUp.pending, (state) => {
    });
    builder.addCase(logout.pending, (state) => {
    });
  },
});

export default UserDataSlice.reducer;
export const { setUserStatusSlice } = UserDataSlice.actions;
export const selectUserData = (state: RootState) => state.UserData;
