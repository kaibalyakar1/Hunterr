import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    loading: false,
    error: null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
      state.loading = false;
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
  },
});

export const { setAllJobs, setLoading, setError, setSingleJob } =
  jobSlice.actions;
export default jobSlice.reducer;
