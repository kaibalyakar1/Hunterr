import Job from "@/components/Jobs/Job";
import Navbar from "@/components/shared/Navbar";
import React from "react";
const randomJob = [1, 2, 3, 4, 5, 6, 7, 8];
const BrowseJob = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search results ({randomJob.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {randomJob.map((job, index) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowseJob;
