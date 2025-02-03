import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Contact, Pen, FileText } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import AppliedJobs from "@/components/Profile/AppliedJobs";
import UpdateProfileDialog from "@/components/Profile/UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  // Safely access nested properties
  const userSkills = user?.profile?.skills || [];
  const userBio = user?.profile?.bio || "No bio available";
  const userResume = user?.profile?.resume || "";

  // Function to get initials for avatar fallback
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      {/* Profile Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user?.profile?.profileImage || ""}
              alt={user?.name}
              className="rounded-full"
            />
            <div className="bg-gray-200 h-full w-full flex items-center justify-center text-xl font-semibold">
              {getInitials(user?.name)}
            </div>
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{user?.name}</h1>
            <p className="text-gray-600 mt-1">{userBio}</p>
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          size="icon"
          className="hover:bg-gray-100"
        >
          <Pen className="h-4 w-4" />
        </Button>
      </div>

      {/* Contact Information */}
      <div className="my-5 space-y-3">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">{user?.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Contact className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">
            {user?.phone || "No phone number added"}
          </span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h2 className="font-medium text-lg mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {userSkills.length > 0 ? (
            userSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                {skill}
              </Badge>
            ))
          ) : (
            <p className="text-gray-500">No skills added</p>
          )}
        </div>
      </div>

      {/* Resume Section */}
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
        <Label className="text-lg font-medium">Resume</Label>
        {userResume ? (
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={userResume}
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              {console.log(userResume)}
              {user?.profile?.resumeOriginalName}
            </a>
          </div>
        ) : (
          <p className="text-gray-500">No resume uploaded</p>
        )}
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h2 className="font-medium text-lg mb-4">Applied Jobs</h2>
        <AppliedJobs />
      </div>

      {/* Profile Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
