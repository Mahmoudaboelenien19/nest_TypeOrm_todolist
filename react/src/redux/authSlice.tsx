import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  isAuth: false,
  name: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    logOutRedux(state) {
      state.isAuth = false;
      state.userId = "";
      state.name = "";
    },
  },
});

export const { setAuth, setUserId, setName, logOutRedux } = authSlice.actions;
export default authSlice.reducer;
