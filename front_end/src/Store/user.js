import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    role: "",
    id: "",
    email: "",
    cart_item_ids: [],
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
      state.user.cart_item_ids.push(action.payload);
    },
    removeCartItemCount: (state, action) => {
      state.user.cart_item_ids = state.user.cart_item_ids.filter(id => id !== action.payload);
    },
  },
});

export const { setUser, setCartItemCount, removeCartItemCount } = userSlice.actions;
export const userData = (state) => state.user.user;
export default userSlice.reducer;
