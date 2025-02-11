import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/Redux/companySlice";
import Swal from "sweetalert2"; // Import Swal

const CompanyCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      console.log("Sending request to create company...");

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/create`,
        { name: companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
        {}
      );

      console.log("Response received:", res.data);

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        const id = res.data.newCompany._id;

        Swal.fire({
          icon: "success",
          title: "Company Created!",
          text: "The company has been registered successfully.",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(`/admin/companies/${id}`);
        });
      }
    } catch (err) {
      console.error("Error creating company:", err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Company Name
            </h1>
            <p className="text-gray-500 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>

            <div className="mt-6">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                         bg-gray-50 p-2.5 border placeholder-gray-400"
              />
              <div className="flex items-center gap-2 my-10">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/admin/companies");
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={registerNewCompany}>Continue</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
