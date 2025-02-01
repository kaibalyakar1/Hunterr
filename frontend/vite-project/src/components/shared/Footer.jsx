import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Company Name</h3>
            <p className="text-sm">
              Finding your dream job or ideal candidate has never been easier.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-blue-700 hover:text-blue-500 cursor-pointer" />
              <Twitter className="w-5 h-5 text-blue-700 hover:text-blue-500 cursor-pointer" />
              <Instagram className="w-5 h-5 text-red-700 hover:text-red-500 cursor-pointer" />
              <Linkedin className="w-5 h-5 text-blue-700 hover:text-blue-500 cursor-pointer" />
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              For Job Seekers
            </h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Browse Jobs</li>
              <li className="hover:text-white cursor-pointer">
                Career Resources
              </li>
              <li className="hover:text-white cursor-pointer">
                Resume Builder
              </li>
              <li className="hover:text-white cursor-pointer">Job Alerts</li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">For Employers</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Post a Job</li>
              <li className="hover:text-white cursor-pointer">
                Browse Candidates
              </li>
              <li className="hover:text-white cursor-pointer">
                Recruiting Solutions
              </li>
              <li className="hover:text-white cursor-pointer">Pricing Plans</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#6A38C2]" />
                <span>123 Job Street, Work City, IN</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[#6A38C2]" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#6A38C2]" />
                <span>contact@company.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 Company Name. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-sm hover:text-white cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-sm hover:text-white cursor-pointer">
                Terms of Service
              </span>
              <span className="text-sm hover:text-white cursor-pointer">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
