import CategoryCarousel from "@/components/Home/CategoryCarousel";
import HeroSection from "@/components/Home/HeroSection";
import LatestJobs from "@/components/Home/LatestJobs";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const Home = () => {
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
