import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { JOB_API_END_POINT } from "@/utils/constant";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    requirements: "",
    salary: "",
    experience: "",
    companyId: "", // Ensure this is set correctly
    noOfpositions: "",
    jobType: "",
  });

  const { companies } = useSelector((state) => state.company);
  const navigate = useNavigate();

  // Handle input change
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle company selection
  const handleCompanySelect = (value) => {
    setInput((prev) => ({ ...prev, companyId: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging: Log the input state
    console.log("Form Input:", input);

    // Validate required fields
    if (!input.companyId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a company.",
      });
      return;
    }

    try {
      // Debugging: Log the API request payload
      console.log("Sending request to backend with payload:", input);

      const res = await axios.post(`${JOB_API_END_POINT}/create`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Debugging: Log the API response
      console.log("API Response:", res.data);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
        }).then(() => {
          navigate("/admin/jobs");
        });
      }
    } catch (error) {
      // Debugging: Log the error
      console.error("API Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to create job. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Job Title
              <input
                id="title"
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                placeholder="Enter job title"
                required
              />
            </label>
          </div>

          {/* Job Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
              <input
                id="description"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                placeholder="Enter job description"
                required
              />
            </label>
          </div>

          {/* Job Requirements */}
          <div>
            <label
              htmlFor="requirements"
              className="block text-sm font-medium mb-1"
            >
              Requirements
              <input
                id="requirements"
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                placeholder="Enter job requirements"
                required
              />
            </label>
          </div>

          {/* Salary Range */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium mb-1">
              Salary Range
              <input
                id="salary"
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                placeholder="Enter salary range"
                required
              />
            </label>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-1"
            >
              Location
              <input
                id="location"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                placeholder="Enter location"
                required
              />
            </label>
          </div>

          {/* Job Type */}
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium mb-1">
              Job Type
              <input
                id="jobType"
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                placeholder="Full-time, Part-time, Contract"
                required
              />
            </label>
          </div>

          {/* Experience Required */}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium mb-1"
            >
              Experience Required
              <input
                id="experience"
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                placeholder="Years of experience"
                required
              />
            </label>
          </div>

          {/* Number of Positions */}
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium mb-1"
            >
              Number of Positions
              <input
                id="position"
                type="number"
                name="noOfpositions"
                value={input.noOfpositions}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                placeholder="Enter number of positions"
                required
              />
            </label>
          </div>

          {/* Company Selection Dropdown */}
          {companies.length > 0 && (
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Company
                <Select
                  onValueChange={handleCompanySelect}
                  value={input.companyId}
                >
                  <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md mt-1">
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Post Job
          </button>
          {companies.length === 0 && (
            <p className="text-red-500 text-xs font-bold text-center my-3">
              *Register a company first before posting a job
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostJob;
