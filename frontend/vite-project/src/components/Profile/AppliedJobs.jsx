import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector((state) => state.job);
  console.log(allAppliedJobs);
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length > 0 ? (
            allAppliedJobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {formatDate(item.job.postedDate)}
                </TableCell>
                <TableCell>
                  {item.job.companyName || item.job.companyName || "N/A"}
                </TableCell>
                <TableCell>{item.job.title || "N/A"}</TableCell>
                <TableCell>{item.job.location || "N/A"}</TableCell>
                <TableCell>
                  {item.job.salary
                    ? `₹${item.job.salary.toLocaleString("en-IN")}/year`
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Badge className={getStatusColor(item.status)}>
                    {item.status
                      ? item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)
                      : "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                No jobs applied yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
