import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/Redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/applicants/${params.id}`,
          {
            withCredentials: true,
          }
        );
        console.log("Applicants Data:", res.data);
        if (res.data.success === true) {
          console.log("Fetched Applicants Data:", res.data.applicants);
          dispatch(setAllApplicants(res.data.applicants));
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
