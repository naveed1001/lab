import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/Cartslice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
