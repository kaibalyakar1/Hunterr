import { setAllJobs, setError, setLoading } from "@/Redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetALlJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAll`, {
          withCredentials: true,
        });

        console.log("Fetched Jobs Response:", res.data.jobs); // Debugging log

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (err) {
        dispatch(setError(err.message));
        console.log("Error fetching jobs:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetALlJobs;
