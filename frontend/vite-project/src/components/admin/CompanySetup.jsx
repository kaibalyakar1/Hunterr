import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { setSingleCompany } from "@/Redux/companySlice";
import useGetCompanyById from "@/hooks/useGetCompanyById";
const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Use the custom hook to fetch company data
  const { loading, error } = useGetCompanyById(params.id);
  console.log("loading:", params.id);
  const { singleCompany } = useSelector((store) => store.company);
  console.log("singleCompany:", singleCompany);
  useEffect(() => {
    if (singleCompany && Object.keys(singleCompany).length > 0) {
      setInput({
        name: singleCompany.name || "",
        email: singleCompany.email || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.logo || null,
      });
    }
  }, [singleCompany]);

  // Handle input change
  const changeEventHandler = (e) => {
    if (e.target.type === "file") {
      setInput({ ...input, file: e.target.files[0] });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Response received:", res.data);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
        });
        navigate("/admin/companies");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="bg-white rounded-lg shadow-sm my-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex items-center gap-4 p-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                Company Setup
              </h1>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={input.name}
                  onChange={changeEventHandler}
                  className="input-field"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={input.email}
                  onChange={changeEventHandler}
                  className="input-field"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  value={input.description}
                  onChange={changeEventHandler}
                  className="input-field"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  required
                  value={input.website}
                  onChange={changeEventHandler}
                  className="input-field"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={input.location}
                  onChange={changeEventHandler}
                  className="input-field"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Logo
                </label>
                <div className="relative flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg p-6 transition duration-300 hover:bg-gray-100 hover:shadow-md">
                  <Upload className="w-12 h-12 text-gray-400 animate-pulse" />
                  <label className="text-blue-600 cursor-pointer hover:underline">
                    Upload a file
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={changeEventHandler}
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2"
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
