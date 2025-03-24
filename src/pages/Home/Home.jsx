import React from "react";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommended from "./Recommended";
import News from "./News";

const Home = () => {
  return (
    <div className="flex flex-col gap-12 ">
      <Banner />
      <TopSellers />
      <Recommended />
      <News />
    </div>
  );
};

export default Home;
