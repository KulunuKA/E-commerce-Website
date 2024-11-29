import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    role: "",
    id: "",
    email: "",
    cartItemCount: 0,
    token: "",
  },
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCartItemCount: (state, action) => {
      state.user.cartItemCount = state.user.cartItemCount + action.payload;
    },
    removeCartItemCount: (state, action) => {
      state.user.cartItemCount = state.user.cartItemCount - action.payload;
    },
  },
});

export const { setUser, setCartItemCount,removeCartItemCount } = userSlice.actions;
export const userData = (state) => state.user.user;
export default userSlice.reducer;
