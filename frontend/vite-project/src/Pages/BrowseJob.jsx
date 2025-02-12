import Job from "@/components/Jobs/Job";
import Navbar from "@/components/shared/Navbar";
import useGetALlJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/Redux/jobSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const randomJob = [1, 2, 3, 4, 5, 6, 7, 8];
const BrowseJob = () => {
  useGetALlJobs();
  const { allJobs } = useSelector((store) => store.job);
  console.log("All Jobs:", allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowseJob;
