import React, { useEffect, useState } from "react";
import EditPropertyList from "./EditPropertyList";
function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (propertyId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found in local storage.");
      return;
    }

    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://127.0.0.1:3000/properties/${propertyId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete property");
        } else {
          alert("property deleted");
        }
        // Optionally, you can update the properties state to reflect the deletion
        setProperties(
          properties.filter((property) => property.id !== propertyId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setShowEditModal(true);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Properties</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Location</th>

            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Listing Type</th>
            <th className="px-4 py-2">Sqft</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td className="border px-4 py-2">{property.name}</td>
              <td className="border px-4 py-2">{property.location}</td>

              <td className="border px-4 py-2">{property.description}</td>
              <td className="border px-4 py-2">{property.listing_type}</td>
              <td className="border px-4 py-2">{property.sqft}</td>
              <td className="border px-4 py-2">{property.price}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 w-20 rounded mr-2"
                  onClick={() => handleEdit(property.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold w-20 mt-1 py-2 px-4 rounded"
                  onClick={() => handleDelete(property.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-stretch justify-center bg-gray-800 bg-opacity-50 bg-white"
          style={{
            height:"",
            overflowY: "auto",
            
          }}
        >
          <div className="bg-white rounded-lg p-3 bg-white  " style={{border:""}}>
            <EditPropertyList propertyId={selectedPropertyId} />
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProperties;
