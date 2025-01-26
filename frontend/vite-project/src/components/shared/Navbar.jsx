import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold  text-black">
            Hunt<span className="text-red-500">err</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="bg-white text-black border  hover:bg-black hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button>Register</Button>
              </Link>
            </div>
          ) : (
            <Popover className="cursor-pointer">
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    className="h-12 w-12 border-2 border-white rounded-full object-cover"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-100 bg-white">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage
                      className="h-12 w-12 border-2 border-white rounded-full object-cover"
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Nerdrover</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <User2 />
                    <Button variant="link">View Profile</Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
