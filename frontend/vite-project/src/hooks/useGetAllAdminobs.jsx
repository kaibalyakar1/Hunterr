import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setAllAdminJobs, setLoading, setError } from "@/Redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token"); // Get token from localStorage (or Redux)
  const fetchAllAdminJobs = useCallback(async () => {
    dispatch(setLoading(true));
    console.log("Fetching admin jobs...");

    try {
      const response = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, {
        withCredentials: true,
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include token here
        },
      });

      console.log("API Response:", response); // Log entire response
      console.log("API Data:", response.data); // Log just the data

      if (response.data.success) {
        dispatch(setAllAdminJobs(response.data.jobs));
      } else {
        throw new Error(response.data.message || "Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      console.error("Error response:", error.response?.data || error.message);
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      fetchAllAdminJobs();
    } else {
      dispatch(setError("Unauthorized: Token missing"));
    }
  }, [fetchAllAdminJobs, token]);
};

export default useGetAllAdminJobs;
