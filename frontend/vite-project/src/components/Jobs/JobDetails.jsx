import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { useParams } from "react-router-dom";
import useGetSingleJob from "@/hooks/useGetSingleJob";
import { APPLIED_JOB_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setError, setLoading, setSingleJob } from "@/Redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const JobDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  console.log("Job ID from Params:", jobId);

  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLIED_JOB_API_END_POINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "You have successfully applied for this job.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Application Failed!",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  console.log("Current User:", user);
  console.log("Redux Single Job State before Fetching:", singleJob);

  useEffect(() => {
    const fetchSingleJob = async () => {
      console.log("Fetching job details for Job ID:", jobId);
      dispatch(setLoading(true));

      try {
        const apiUrl = `${JOB_API_END_POINT}/get/${jobId}`;
        console.log("API Request URL:", apiUrl);

        const res = await axios.get(apiUrl, {
          withCredentials: true,
        });

        console.log("API Response:", res.data);

        if (res.data.success) {
          console.log("Fetched Job Data:", res.data.job);
          dispatch(setSingleJob(res.data.job));
          console.log("Dispatched setSingleJob with:", res.data.job);
        } else {
          console.error("API Response Success is False:", res.data);
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (jobId) {
      fetchSingleJob();
    } else {
      console.error("Job ID is undefined, skipping fetch.");
    }
  }, [jobId, dispatch, user?._id]);

  console.log("Redux Single Job State after Fetching:", singleJob);

  const isApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-bold text-2xl text-gray-900">
              {singleJob?.title || "N/A"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge className="text-blue-700 font-semibold bg-blue-50">
                {singleJob?.noOfpositions || "N/A"} positions
              </Badge>
              <Badge className="text-red-700 font-semibold bg-red-50">
                {singleJob?.jobType || "N/A"}
              </Badge>
              <Badge className="text-[#6A38C2] font-semibold bg-purple-50">
                {singleJob?.salary ? `${singleJob.salary} LPA` : "N/A"}
              </Badge>
            </div>
          </div>
          {/* Apply Button */}

          <Button
            onClick={isApplied ? () => {} : applyJobHandler}
            disabled={isApplied}
            className="bg-[#6A38C2] hover:bg-[#6A38C2] text-white"
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Job Description Section */}
        <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-200 pb-3 mb-6">
          Job Description
        </h2>

        <div className="space-y-4">
          {singleJob ? (
            // Logging final job data here outside of the map
            (console.log("Final Single Job Data:", singleJob),
            // Mapping the job details to display
            [
              { label: "Role", value: singleJob.title || "N/A" },
              { label: "Company", value: singleJob.companyName || "N/A" },
              { label: "Location", value: singleJob.location || "N/A" },
              { label: "Country", value: singleJob.country || "N/A" },
              { label: "Description", value: singleJob.description || "N/A" },
              {
                label: "Experience",
                value: singleJob.experience
                  ? `${singleJob.experience} years`
                  : "N/A",
              },
              {
                label: "Salary",
                value: singleJob.salary ? `${singleJob.salary} LPA` : "N/A",
              },
              { label: "Job Type", value: singleJob.jobType || "N/A" },
              {
                label: "Positions Available",
                value: singleJob.noOfpositions || "N/A",
              },
              {
                label: "Total Applications",
                value: singleJob.applications?.length || "0",
              },
              {
                label: "Posted Date",
                value: singleJob.createdAt
                  ? new Date(singleJob.createdAt).toLocaleDateString("en-GB")
                  : "N/A",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
              >
                <dt className="font-semibold text-gray-900 min-w-[160px]">
                  {item.label}:
                </dt>
                <dd className="text-gray-700">{item.value}</dd>
              </div>
            )))
          ) : (
            <p className="text-gray-500">Loading job details...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetails;
