import React from "react";
import FilterCard from "@/components/Jobs/FilterCard";
import Job from "@/components/Jobs/Job";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useSelector } from "react-redux";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, loading, error } = useSelector((store) => store.job);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Section */}
          <div className="w-full md:w-64 shrink-0">
            <FilterCard />
          </div>

          {/* Jobs Grid Section */}
          <div className="flex-1">
            {allJobs.length <= 0 ? (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg border">
                <span className="text-gray-500 text-lg">No jobs found</span>
              </div>
            ) : (
              <div className="h-[calc(100vh-8rem)] overflow-y-auto pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allJobs.map((job) => (
                    <Job key={job._id} job={job} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
