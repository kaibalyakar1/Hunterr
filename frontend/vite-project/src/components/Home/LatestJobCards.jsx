import React from "react";
import { Badge } from "../ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer flex flex-col items-start">
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div className="flex flex-col items-start">
        {" "}
        {/* Added flex layout here */}
        <h1 className="font-bold text-lg my-2">Job title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet</p>
      </div>
      <div className="flex items-start gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          12positions
        </Badge>
        <Badge className={"text-red-700 font-bold"} variant={"ghost"}>
          Part Time
        </Badge>
        <Badge className={"text-[#6A38C2] font-bold"} variant={"ghost"}>
          24LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
