import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyContext from "./MyContext";
import Footer from "./Footer";
import MapContainer from "./MapContainer";
import $ from "jquery";

const IndividualListing = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/properties/${id}`)
      .then((response) => response.json())
      .then((data) => setProperty(data))
      .catch((error) => console.log(error));

    const handleScroll = () => {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();

      $(".scroll-animation").each(function () {
        const elementOffset = $(this).offset().top;
        if (elementOffset < scrollTop + windowHeight) {
          $(this).addClass("show");
        }
      });
    };

    $(window).on("scroll", handleScroll);

    return () => {
      $(window).off("scroll", handleScroll);
    };
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100">
      <div>
        <MyContext.Provider value={property}>
          <div className="bg-gray-100">
            <h1 className="text-3xl font-bold mt-0">{property.name}</h1>
          </div>
          <div className="bg-gray-100">
            <div className="flex justify-center" style={{ height: "60%" }}>
              <img src={property.media[0]} alt="signature" className="" />
            </div>
          </div>
          <div className="bg-gray-130">
            <h1 className="text-2xl font-bold mb-4 mt-1S">Description</h1>
            <div className="scroll-animation flex justify-center ">
              <p>
                {property.description}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae,
                ipsa cumque. Vero, placeat enim veniam expedita explicabo alias
                quibusdam a quia fugiat harum quae? Ex magni mollitia laborum
                ratione modi?
              </p>
            </div>
          </div>
          <div className="bg-gray-200 h-100 m-2">
            <h5 className="text-2xl font-bold mb-4">Gallery</h5>
            <div className="scroll-animation ">
              <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 px-3">
                {property.media.map((image) => (
                  <div key={image.id} className="">
                    <img
                      src={image}
                      alt=""
                      className="object-cover rounded-lg group-item mt-2 mb-4 hover:scale-110"
                      style={{
                        height: "280px",
                        width: "230px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MyContext.Provider>
      </div>
      <h5 className="text-2xl font-bold mb-4 mt-2">Location</h5>
      <div className="scroll-animation">
        <MapContainer property={property} />
      </div>

      <div className="scroll-animation">
        <Footer />
      </div>
    </div>
  );
};

export default IndividualListing;
