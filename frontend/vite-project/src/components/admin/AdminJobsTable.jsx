import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchText, loading, error } = useSelector(
    (state) => state.job
  );
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (allAdminJobs && Array.isArray(allAdminJobs)) {
      const result = allAdminJobs.filter((job) =>
        job.title.toLowerCase().includes(searchText)
      );
      setFilteredJobs(result);
    }
  }, [allAdminJobs, searchText]);

  if (loading) return <div className="text-center py-4">Loading jobs...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <Table>
      <TableCaption>A list of your recently posted jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Applications</TableHead>
          <TableHead>Posted Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.companyName}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.applications?.length || 0}</TableCell>
              <TableCell>
                {format(new Date(job.postedDate), "dd MMM yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="h-5 w-5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <button
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/jobs/applicants/${job._id}`)
                      }
                      className="flex items-center gap-2 cursor-pointer mt-2"
                    >
                      <Eye />
                      <span>Applicants</span>
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No jobs found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AdminJobsTable;
