import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleCompany: null,
  companies: [],
  searchCompanyByText: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setSingleCompany: (state, action) => {
      console.log("Setting single company:", action.payload);
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      // Ensure we're setting an array
      state.companies = Array.isArray(action.payload) ? action.payload : [];
    },

    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies, setSearchCompanyByText } =
  companySlice.actions;
export default companySlice.reducer;
