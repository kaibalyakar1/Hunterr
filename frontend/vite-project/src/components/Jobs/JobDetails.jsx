import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const JobDetails = () => {
  const isApplied = true;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-bold text-2xl text-gray-900">Title</h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge
                className="text-blue-700 font-semibold bg-blue-50"
                variant="ghost"
              >
                12 positions
              </Badge>
              <Badge
                className="text-red-700 font-semibold bg-red-50"
                variant="ghost"
              >
                Part Time
              </Badge>
              <Badge
                className="text-[#6A38C2] font-semibold bg-purple-50"
                variant="ghost"
              >
                24 LPA
              </Badge>
            </div>
          </div>
          <Button
            disabled={isApplied}
            className={`rounded-lg px-6 py-2 transition-colors ${
              isApplied
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#7289b7] hover:bg-[#5d7299] text-white"
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Job Description Section */}
        <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-200 pb-3 mb-6">
          Job Description
        </h2>

        <div className="space-y-4">
          {[
            { label: "Role", value: "Frontend Developer" },
            { label: "Location", value: "Hyderabad" },
            {
              label: "Description",
              value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            },
            { label: "Experience", value: "2 years" },
            { label: "Salary", value: "12 LPA" },
            { label: "Total Applications", value: "4" },
            { label: "Posted Date", value: "17-07-2024" },
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
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetails;
