import CategoryCarousel from "@/components/Home/CategoryCarousel";
import HeroSection from "@/components/Home/HeroSection";
import LatestJobs from "@/components/Home/LatestJobs";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import useGetALlJobs from "@/hooks/useGetAllJobs";
import React from "react";

const Home = () => {
  useGetALlJobs();
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
