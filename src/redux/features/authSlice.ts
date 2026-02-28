// authSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      console.log(state.user)
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;