import React from "react";
import { Badge } from "../ui/badge";

const LatestJobCards = ({ job }) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer flex flex-col items-start">
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-medium text-lg">{job?.companyName}</h1>
        <div className="flex gap-2 items-center">
          {" "}
          <p className="text-lg font-semibold text-gray-600">{job?.country}</p>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div className="flex flex-col items-start">
        {" "}
        {/* Added flex layout here */}
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 text-left">{job?.description}</p>
      </div>
      <div className="flex items-start gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.noOfpositions
            ? `${job.noOfpositions} positions`
            : "No positions available"}
        </Badge>
        <Badge className={"text-[#6A38C2] font-bold"} variant={"ghost"}>
          {job?.experience ? `${job.experience} years` : "No experience"}
        </Badge>
        <Badge className={"text-[#6A38C2] font-bold"} variant={"ghost"}>
          {job?.salary ? `${job.salary} LPA` : "No salary"}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
