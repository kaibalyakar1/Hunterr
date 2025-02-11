import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies = [], searchCompanyByText } = useSelector(
    (state) => state.company
  );

  const filteredCompanies = companies.filter((company) => {
    if (!searchCompanyByText) return true;
    return company?.name
      ?.toLowerCase()
      .includes(searchCompanyByText.toLowerCase().trim());
  });

  return (
    <Table>
      <TableCaption>A list of your recently added companies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCompanies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No companies found
            </TableCell>
          </TableRow>
        ) : (
          filteredCompanies.map(
            (company) => (
              console.log("Company:", company),
              (
                <TableRow key={company.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={company.logo || ""}
                        alt={company.name}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>
                    {new Date(company.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="h-5 w-5" />
                      </PopoverTrigger>
                      <PopoverContent className="w-40">
                        <button
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              )
            )
          )
        )}
      </TableBody>
    </Table>
  );
};

export default CompaniesTable;
