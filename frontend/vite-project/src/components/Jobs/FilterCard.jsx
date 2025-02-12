import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/Redux/jobSlice";

const FilterCard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Hyderabad", "Chennai", "Bangalore", "Bhubaneswar"], // Added empty array for consistency
    },
    {
      filterType: "Industry",
      array: ["frontend", "backend", "fullstack", "devops", "testing"],
    },
  ];
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Filter</h1>
      <hr className="my-3" />
      {filterData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4">
          <h2 className="font-bold text-lg mb-2">{section.filterType}</h2>
          {section.array && section.array.length > 0 && (
            <RadioGroup
              value={selectedValue}
              onValueChange={changeHandler}
              className="space-y-2"
            >
              {section.array.map((item, index) => {
                const itemId = `id${sectionIndex}-${index}`;
                return (
                  <div key={item} className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
