import React, { useEffect, useState } from "react";
import PropertyCarousel from "./PropertyCarousel";

const PropertiesList = ({ id }) => {
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!properties) {
    return <div>Loading...</div>;
  }

  console.log(properties);

  const groupProperties = (array, groupSize) => {
    const groups = [];
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize));
    }
    return groups;
  };

  const propertyGroups = groupProperties(properties.reverse(), 3);

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
      {propertyGroups.map((group, index) => (
        <div key={index} className="flex flex-grow space-x-4 mt-4">
          {group.map((property) => (
            <div
              key={property.id}
              className="w-full h-auto max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-teal-600 dark:border-gray-700 overflow-hidden shadow-lg"
            >
              <PropertyCarousel images={property.media} />
              <div className="px-2 pb-3">
                <a href="#">
                  <h5
                    className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-0"
                    style={{ marginLeft: "3px" }}
                  >
                    {property.name}
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    {truncateDescription(property.description, 20)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${property.price}
                  </span>
                  <a
                    href="#"
                    className="text-sm inline-block px-4 py-2 leading-none border rounded text-dark border-dark hover:border-transparent hover:text-dark-500 hover:bg-white mt-4 mr-2 lg:mt-0"
                  >
                    <strong>Know More</strong>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertiesList;
