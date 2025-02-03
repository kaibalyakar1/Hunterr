import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/Redux/authSlice";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const Signup = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const chanegFileHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "User created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto mt-5">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-300 p-5 rounded"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label>Full Name</Label>
            <input
              className="w-full border border-gray-300 p-2 rounded"
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <input
              className="w-full border border-gray-300 p-2 rounded"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <input
              className="w-full border border-gray-300 p-2 rounded"
              type="text"
              name="phone"
              value={input.phone}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <input
              className="w-full border border-gray-300 p-2 rounded"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>

          <div className="mt-5 flex">
            <RadioGroup className="w-full flex items-center gap-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="JOBSEEKER"
                  checked={input.role === "JOBSEEKER"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Jobseeker</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="EMPLOYER"
                  checked={input.role === "EMPLOYER"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r3">Employer</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={chanegFileHandler}
                name="file"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Link to="/login">
              Already have an account?{" "}
              <span className="text-blue-500">Login</span>
            </Link>
          </div>

          <div className="mt-5">
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
