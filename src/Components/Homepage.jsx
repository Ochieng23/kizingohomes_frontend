import React from "react";
import Carousel from "./Carousel";
import HomepageText from "./HomepageText";
import PropertiesList from "./PropertiesList";
import Footer from "./Footer";

function Homepage() {
  return (
    <div>
      <Carousel />
      <HomepageText />
      <div
        className="border border-black-300"
        style={{ height: "1px", flex: "1" }}
      ></div>
      <h5 className="text-3xl font-bold mt-0"></h5>
      <PropertiesList />
      <Footer />
    </div>
  );
}

export default Homepage;
