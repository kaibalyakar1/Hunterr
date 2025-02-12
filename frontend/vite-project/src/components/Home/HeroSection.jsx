import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { setSearchedQuery } from "@/Redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browsejob");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-600 font-medium">
          No 1 Job Hunt Platform
        </span>
        <h1 className="text-4xl font-bold mt-4">
          Search , Apply & <br />
          Get your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ad
          ratione nemo quas provident iste. Sed, beatae sapiente. Nam, cumque.
        </p>
        <div className="flex w-[40%] shadow-lg border-gray-200 mx-auto h-10 ">
          <input
            type="text"
            placeholder="Search Jobs"
            className="px-4 py-2 rounded-lg bg-gray-100 w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchJobHandler} className="bg-[#6A38C2] w-[8%]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
