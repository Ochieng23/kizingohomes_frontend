import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyContext from "./MyContext";

const IndividualListing = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/properties/${id}`)
      .then((response) => response.json())
      .then((data) => setProperty(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <MyContext.Provider value={property}>
      <h2>{property.name}</h2>
      {property.media.map((image) => (
        <img key={image.id} src={image} alt="" />
      ))}
    </MyContext.Provider>
  );
};

export default IndividualListing;
