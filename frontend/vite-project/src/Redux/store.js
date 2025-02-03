import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import jobSlice from "./jobSlice.js"; // Import the jobSlice reducer

const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice, // Corrected
  },
});

export default store;
