import { setAllApplicants } from "@/Redux/applicationSlice";
import { setAllAppliedJobs } from "@/Redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/getAll`, {
          withCredentials: true,
        });
        console.log("Applied Jobs Data:", res.data);
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
