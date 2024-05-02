import React from "react";
import Hero from "./components/Hero";
import JobSection from "./components/JobSection";

const HomePage = () => {
  return <div className="p-4">
    <Hero/>
    <JobSection/>
  </div>;
};

export default HomePage;
