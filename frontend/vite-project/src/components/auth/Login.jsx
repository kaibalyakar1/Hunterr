import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "sonner";
import { setLoading, setUser } from "@/Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const Login = () => {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "JOBSEEKER",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: res.data.message || "Welcome back!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
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
          <h1 className="font-bold text-xl mb-5">Login</h1>

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
            <Label>Password</Label>
            <input
              className="w-full border border-gray-300 p-2 rounded"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <div className="mt-5 flex">
            <RadioGroup className="w-full flex items-center gap-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="JOBSEEKER"
                  className="cursor-pointer"
                  checked={input.role === "JOBSEEKER"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Jobseeker</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="EMPLOYER"
                  className="cursor-pointer"
                  checked={input.role === "EMPLOYER"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r3">Employer</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between mt-8">
            <Link to="/signup">
              Don't have an account?{" "}
              <span className="text-blue-500">Signup</span>
            </Link>
          </div>

          {loading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
