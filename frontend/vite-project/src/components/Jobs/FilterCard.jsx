import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FilterCard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Hyderabad", "Chennai", "Bangalore"], // Added empty array for consistency
    },
    {
      filterType: "Industry",
      array: ["frontend", "backend", "fullstack", "devops", "testing"],
    },
    {
      filterType: "salary",
      array: ["0-1k", "1-2k", "2-3k", "3-4k", "4-5k", "5-6k", "6-7k", "7-8k"],
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Filter</h1>
      <hr className="my-3" />
      {filterData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4">
          <h2 className="font-bold text-lg mb-2">{section.filterType}</h2>
          {section.array && section.array.length > 0 && (
            <RadioGroup className="space-y-2">
              {section.array.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
