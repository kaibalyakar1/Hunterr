import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, User2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/Redux/authSlice";
import Swal from "sweetalert2";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

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
                      src={user.profile.profileImage}
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </Avatar>
                </Button>
              </PopoverTrigger>
              {`Hii ${user.name}`}
              <PopoverContent className="w-80 p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={user.profile.profileImage}
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
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
                    onClick={logoutHandler}
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
