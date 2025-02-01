import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const id = "123";
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
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
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
          itaque reprehenderit illum eum provident magni.
        </p>
      </div>
      <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
        12positions
      </Badge>
      <Badge className={"text-red-700 font-bold"} variant={"ghost"}>
        Part Time
      </Badge>
      <Badge className={"text-[#6A38C2] font-bold"} variant={"ghost"}>
        24LPA
      </Badge>
      <div className="mt-5 flex items-center gap-2 hover:cursor-pointer hover:bg-white hover:text-black">
        <Button
          onClick={() => navigate(`/job/${id}`)}
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
