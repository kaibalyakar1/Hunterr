import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
const categories = ["All", "Clothing", "Shoes", "Accessories", "More"];
const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem key={category} className="md:basis-1/2 lg-basis-1/3">
              <Button
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
