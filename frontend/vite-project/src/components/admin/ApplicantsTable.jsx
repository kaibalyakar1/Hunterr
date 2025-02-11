import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import Swal from "sweetalert2";
import { setAllApplicants } from "@/Redux/applicationSlice";

const ApplicantsTable = () => {
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.application.applicants) || [];
  const shortListingApplication = ["accepted", "rejected"];

  const statusHandler = async (status, applicationId, jobId) => {
    try {
      const token = localStorage.getItem("token");

      // Update application status
      const response = await axios.put(
        `${APPLICATION_API_END_POINT}/updateStatus/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Application status updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Fetch updated list of applicants
        const updatedResponse = await axios.get(
          `${APPLICATION_API_END_POINT}/applicants/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Updated Applicants Response:", updatedResponse.data);

        if (Array.isArray(updatedResponse.data.applicants)) {
          dispatch(setAllApplicants(updatedResponse.data.applicants));
        } else {
          console.error("Unexpected API response:", updatedResponse.data);
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to update status",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableCaption>List of applicants for the job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(applicants) &&
            applicants.map((item) => {
              const { applicant, status, _id: applicationId, job } = item;
              const { profile } = applicant;

              return (
                <TableRow key={applicant._id}>
                  <TableCell className="font-medium">
                    {applicant.name || "N/A"}
                  </TableCell>
                  <TableCell>{applicant.email || "N/A"}</TableCell>
                  <TableCell>{applicant.phone || "N/A"}</TableCell>
                  <TableCell>
                    {profile?.resume ? (
                      <a
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 underline"
                      >
                        {profile.resumeOriginalName || "View Resume"}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {profile?.skills?.length > 0 ? (
                      <span>{profile.skills.join(", ")}</span>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {applicant.createdAt
                      ? new Date(applicant.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {profile?.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt={`${applicant.name}'s profile`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger
                        className={`px-3 py-1 rounded-md transition-colors ${
                          status?.toLowerCase() === "accepted"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : status?.toLowerCase() === "rejected"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {status || "Pending"}
                      </PopoverTrigger>
                      <PopoverContent className="bg-white rounded-md shadow-lg p-1 w-32">
                        {shortListingApplication.map((statusOption) => (
                          <div
                            key={statusOption}
                            onClick={() =>
                              statusHandler(
                                statusOption,
                                applicationId,
                                job._id
                              )
                            }
                            className="cursor-pointer hover:bg-gray-100 p-2 rounded-sm transition-colors"
                          >
                            <span>{statusOption}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
