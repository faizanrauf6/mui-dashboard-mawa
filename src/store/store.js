// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Adjust the path

const store = configureStore({
  reducer: {
    user: userReducer,
    // Other reducers
  },
});

export default store;
