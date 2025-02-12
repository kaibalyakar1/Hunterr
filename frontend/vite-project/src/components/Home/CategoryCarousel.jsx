import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/Redux/jobSlice";
import { useNavigate } from "react-router-dom";
const categories = ["All", "Clothing", "Shoes", "Accessories", "More"];
const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    console.log("Query:", query);
    navigate("/browsejob");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
              <Button
                onClick={() => searchJobHandler(category)}
                variant="outline"
                className="w-full rounded bg-gray-200 h-16 hover:bg-gray-300"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
          <CarouselItem></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
