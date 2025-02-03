import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const id = "123";
  const daysAgoFunction = (mongodbTime) => {
    // Ensure that the passed value is a valid date
    const createdAt = new Date(mongodbTime);

    // Check if the createdAt is a valid date
    if (isNaN(createdAt)) {
      return "Invalid Date"; // or return some default message like "N/A"
    }

    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - createdAt.getTime();
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return daysAgo;
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 w-96">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(
            job?.createdAt === 0 ? "Today" : `${job?.createdAt}`
          )}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.companyName}</h1>
          <div className="flex gap-2 items-center">
            {" "}
            <p className="text-lg font-semibold text-gray-600">
              {job?.country}
            </p>
            <p className="text-sm text-gray-500">{job?.location}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
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
      <div className="mt-5 flex items-center gap-2 hover:cursor-pointer hover:bg-white hover:text-black">
        <Button
          onClick={() => navigate(`/job/${job?._id}`)}
          className="hover:cursor-pointer hover:bg-white hover:text-black"
        >
          Details
        </Button>
        <Button className="hover:cursor-pointer hover:bg-white hover:text-black">
          Save Job
        </Button>
      </div>
    </div>
  );
};

export default Job;
