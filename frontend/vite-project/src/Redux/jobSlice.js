import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  loading: false,
  error: null,
  searchText: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
      state.loading = false;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setAllAdminJobs,
  setLoading,
  setError,
  setSingleJob,
  setSearchText,
} = jobSlice.actions;

export default jobSlice.reducer;
