import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import AdminJobsTable from "@/components/admin/AdminJobsTable";
import { setSearchText } from "@/Redux/jobSlice";
import Navbar from "../shared/Navbar";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminobs";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const { allAdminJobs, loading, error } = useSelector((state) => state.job);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Search Input:", searchInput);
      dispatch(setSearchText(searchInput.trim().toLowerCase()));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, dispatch]);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search roles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 w-full p-2 border rounded"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button onClick={() => navigate("/admin/jobs/create")}>
            Create Job
          </Button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <AdminJobsTable jobs={allAdminJobs} />
        )}
      </div>
    </>
  );
};

export default AdminJobs;
