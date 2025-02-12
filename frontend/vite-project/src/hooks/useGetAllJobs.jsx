import { setAllJobs, setError, setLoading } from "@/Redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetALlJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      dispatch(setLoading(true));
      try {
        console.log("Fetching jobs with query:", searchedQuery); // Debugging log
        const res = await axios.get(
          `${JOB_API_END_POINT}/getAll?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          }
        );

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
  }, [dispatch, searchedQuery]); // Ensure searchedQuery is a dependency
};
export default useGetALlJobs;
