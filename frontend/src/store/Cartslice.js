import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
