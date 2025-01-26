import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto mt-5">
        <form action="" className="w-1/2 border border-gray-300 p-5 rounded">
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Full Name</Label>
            <input
              className="w-full border border-gray-300 p-2 rounded"
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <input
              className="w-full border border-gray-300 p-2 rounded"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-5 flex">
            <RadioGroup className="w-full flex items-center gap-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="jobseeker"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Jobseeker</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  className="cursor-pointer"
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
          <div className="mt-5 ">
            <Button type="submit" className=" text-white p-2 rounded">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
