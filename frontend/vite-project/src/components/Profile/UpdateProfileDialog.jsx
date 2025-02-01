import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/Redux/authSlice";
import Swal from "sweetalert2";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    file: null,
  });

  // Show confirmation before closing if form is dirty
  const handleClose = () => {
    const isDirty =
      input.name !== user?.name ||
      input.email !== user?.email ||
      input.phone !== user?.phone ||
      input.bio !== user?.profile?.bio ||
      input.skills !==
        (Array.isArray(user?.profile?.skills)
          ? user.profile.skills.join(", ")
          : "") ||
      input.file !== null;

    if (isDirty) {
      Swal.fire({
        title: "Discard changes?",
        text: "You have unsaved changes. Are you sure you want to close?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, discard",
        cancelButtonText: "No, keep editing",
      }).then((result) => {
        if (result.isConfirmed) {
          setOpen(false);
        }
      });
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open && !user) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please log in to update your profile",
        icon: "error",
        timer: 3000,
        timerProgressBar: true,
      });
      setTimeout(() => setOpen(false), 3000);
      return;
    }

    if (user) {
      setInput({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.profile?.bio || "",
        skills: Array.isArray(user.profile?.skills)
          ? user.profile.skills.join(", ")
          : "",
        file: null,
      });
    }
  }, [user, open]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError("");
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setInput({ ...input, file: file });
      setError("");
      // Show success toast for file upload
      Swal.fire({
        title: "File Selected",
        text: file.name,
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      setError("Please upload a PDF file");
      Swal.fire({
        title: "Invalid File",
        text: "Please upload a PDF file only",
        icon: "error",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      Swal.fire({
        title: "Error",
        text: "User data not available. Please log in again.",
        icon: "error",
      });
      return;
    }

    // Show loading state
    Swal.fire({
      title: "Updating Profile",
      html: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("bio", input.bio);

    const skillsArray = input.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    formData.append("skills", JSON.stringify(skillsArray));

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const response = await axios.put(
        `${USER_API_END_POINT}/update/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.user) {
        const updatedUser = {
          ...response.data.user,
          token: user.token,
        };
        dispatch(setUser(updatedUser));

        // Show success message
        await Swal.fire({
          title: "Success!",
          text: "Profile updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setOpen(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error updating profile";

      // Show error message
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });

      setError(errorMessage);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and resume. All fields are optional.
          </DialogDescription>
        </DialogHeader>

        {!user ? (
          <div className="text-red-500 text-sm p-4 text-center">
            Please log in to update your profile
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            {/* Form fields remain the same */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <input
                type="text"
                name="name"
                id="name"
                value={input.name}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <input
                type="email"
                name="email"
                id="email"
                value={input.email}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={input.phone}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                name="bio"
                id="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <input
                type="text"
                name="skills"
                id="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="React, Node.js, JavaScript"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Resume (PDF only)</Label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={fileChangeHandler}
                accept=".pdf"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {input.file && (
                <p className="text-sm text-gray-500">{input.file.name}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !user}
              >
                Update Profile
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
