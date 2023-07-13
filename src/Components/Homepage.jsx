import React from "react";
import Carousel from "./Carousel";
import HomepageText from "./HomepageText";
import PropertiesList from "./PropertiesList";
import Footer from "./Footer";
import Projects from "./Projects";
import { FaWhatsapp } from "react-icons/fa";

function Homepage() {
  const phoneNumber = "254791410460";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

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
      <a
        className="nav-link fixed bottom-1 right-4 flex items-center bg-black text-white px-4 py-2 rounded-lg mb-11"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="mr-2 " style={{ color: "#CAB64D" }} />
        Talk to us
      </a>
    </div>
  );
}

export default Homepage;
