import React from "react";
import Carousel from "./Carousel";
import HomepageText from "./HomepageText";
import PropertiesList from "./PropertiesList";
import Footer from "./Footer";
import Projects from "./Projects";

function Homepage() {
  return (
    <div>
      <Carousel />
      <HomepageText />
      <div
        className="border border-black-300"
        style={{ height: "1px", flex: "1" }}
      ></div>
      <h5 className="text-2xl font-bold mt-0">Listings</h5>
      <PropertiesList />
      <div
        className="border border-black-300"
        style={{ height: "1px", flex: "1" }}
      ></div>
      <h5 className="text-2xl font-bold mt-0">Off-Plan projects</h5>
      <Projects />
      <Footer />
    </div>
  );
}

export default Homepage;
