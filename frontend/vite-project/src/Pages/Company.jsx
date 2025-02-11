import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CompaniesTable from "@/components/admin/CompaniesTable";
import { setSearchCompanyByText } from "@/Redux/companySlice";

const Company = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Debounce the search dispatch to prevent too many updates
    const timeoutId = setTimeout(() => {
      dispatch(setSearchCompanyByText(searchInput));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button onClick={() => navigate("/admin/companies/create")}>
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Company;
