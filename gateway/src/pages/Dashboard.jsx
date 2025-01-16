import React from "react";
import Dashboard from "../components/Home/Dashboard"

const HomePage = () => {
  return (
    <div className="bg-gray-100 w-full h-screen overflow-y-auto"> 
   
      <div className="px-4 lg:px-16 space-y-16">
        <Dashboard />
        
      </div>
    </div>
  );
};

export default HomePage;
