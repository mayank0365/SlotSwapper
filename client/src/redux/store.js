import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice';
import swapReducer from './slices/swapSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    swap: swapReducer,
  },
});
