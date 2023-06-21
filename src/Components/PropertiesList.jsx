import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCarousel from "./PropertyCarousel";
import MyContext from "./MyContext";

const PropertiesList = () => {
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.log(error));
  }, []);

  if (!properties) {
    return <div>Loading...</div>;
  }

  const truncateDescription = (description, wordCount) => {
    const words = description.split(" ");
    if (words.length <= wordCount) {
      return description;
    } else {
      const truncatedWords = words.slice(0, wordCount);
      return `${truncatedWords.join(" ")}...`;
    }
  };

  return (
    <div className="mx-7 my-3 mt-4">
      <MyContext.Provider value={properties}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white border border-gray-200 rounded-lg dark:bg-teal-600 dark:border-gray-700 overflow-hidden shadow-lg"
            >
              <PropertyCarousel images={property.media} />
              <div className="px-2 pb-3">
                <Link to={`/listing/${property.id}`}>
                  <h5 className="font-semibold tracking-tight text-gray-900 dark:text-black mt-0 whitespace-no-wrap">
                    {property.name}
                  </h5>
                </Link>

                <div className="flex items-center mt-2.5 mb-5">
                  <span className="bg-teal-600 text-white font-semibold px-2.5 py-0.5 rounded dark:bg-white-200 dark:text-white-800">
                    {truncateDescription(property.description, 20)}
                  </span>
                </div>
                <div className="flex items-center mt-2.5 mb-5">
                  <a href="#">
                    <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white mt-0 whitespace-no-wrap">
                      {property.location}
                    </h5>
                  </a>
                </div>
                <div
                  className="border border-black-300"
                  style={{ height: "1px", flex: "1" }}
                ></div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold text-gray-900 dark:text-black px-3 py-2">
                    ${property.price}
                  </span>

                  <Link
                    to={`/listing/${property.id}`}
                    className="text-sm inline-block px-3 py-2 leading-none border rounded text-dark border-dark hover:border-transparent hover:text-dark-500 hover:bg-white mt-4 mr-2 lg:mt-0"
                  >
                    <strong>Know More</strong>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MyContext.Provider>
    </div>
  );
};

export default PropertiesList;
