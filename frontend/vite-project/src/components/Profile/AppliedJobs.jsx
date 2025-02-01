import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Item } from "@radix-ui/react-radio-group";
import { Badge } from "../ui/badge";

const AppliedJobs = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((Item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">17/02/2023</TableCell>
              <TableCell className="font-medium">google</TableCell>
              <TableCell className="font-medium">SDE 2</TableCell>
              <TableCell className="text-right font-medium">
                <Badge>Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
