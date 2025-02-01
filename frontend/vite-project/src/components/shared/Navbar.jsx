import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogOut, User2 } from "lucide-react";

// Import from shadcn/ui components instead of Radix
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);

  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold text-black">
            Hunt<span className="text-red-500">err</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link to="/" className="hover:text-red-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-red-500 transition-colors">
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/browsejob"
                className="hover:text-red-500 transition-colors"
              >
                Browse
              </Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="hover:bg-black hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button>Register</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit amet consectetur
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 justify-start"
                  >
                    <User2 className="h-4 w-4" />
                    <Link to="/profile">Profile</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
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
