import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";

const initialState = {
  user: {
    role: "",
    id: "",
    email: "",
    token: "",
  },
  cart_items: {
    id: "",
    items: [],
    userId: "",
  },
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCartItem: (state, action) => {
      state.cart_items = action.payload;
    },
    setCartItems: (state, action) => {
      state.cart_items.items.push(action.payload);
    },
    removeCartItem: (state, action) => {
      state.cart_items.items = state.cart_items.items.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const { setUser, setCartItems, removeCartItem, setCartItem } =
  userSlice.actions;
export const userData = (state) => state.user.user;
export const cartItems = (state) => state.user.cart_items;
export default userSlice.reducer;
