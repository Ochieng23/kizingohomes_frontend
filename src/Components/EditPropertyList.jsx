import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

const EditPropertyList = ({ propertyId }) => {
  const [property, setProperty] = useState({
    name: "",
    location: "",
    description: "",
    listing_type: "",
    sqft: "",
    price: "",
    media: [],
  });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/properties/${propertyId}`
      );
      const data = response.data;
      setProperty(data);
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  };

  const cloudinaryUploadPreset = "hcdgzzgi";
  const cloudinaryCloudName = "dhz4c0oae";

  const handleDrop = (acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  const deleteImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const deleteExistingImage = (index) => {
    setProperty((prevProperty) => {
      const newMedia = [...prevProperty.media];
      newMedia.splice(index, 1);
      return {
        ...prevProperty,
        media: newMedia,
      };
    });
  };

  const editProperty = async (e) => {
    e.preventDefault();

    try {
      const uploaders = images.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudinaryUploadPreset);
        formData.append("api_key", cloudinaryCloudName);

        return axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
          .then((response) => {
            const data = response.data;
            const fileURL = data.secure_url;
            return fileURL;
          });
      });

      const imageUrls = await axios.all(uploaders);

      const updatedProperty = {
        ...property,
        media: [...property.media, ...imageUrls],
      };

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found in local storage.");
        return;
      }

      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const userCode = decodedToken.user_ref;

      try {
        const response = await fetch(
          `http://127.0.0.1:3000/properties/${propertyId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProperty),
          }
        );

        if (response.ok) {
          console.log("Property updated successfully");
          setProperty({
            name: "",
            location: "",
            description: "",
            listing_type: "",
            sqft: "",
            price: "",
            media: [],
          });
          setImages([]);
          alert("property edited");
          navigate("/properties"); // Use navigate function to redirect
        } else {
          console.error("Error updating property");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-sm mx-auto border border-teal-600 m-2 p-4 rounded-lg self-baseline bg-white " style={{border:""}}>
      <form onSubmit={editProperty}>
        <div className="flex justify-center gap-1">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-bold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={property.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-2 font-bold">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={property.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-bold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={property.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="flex justify-center gap-2">
          <div className="mb-4">
            <label htmlFor="listing_type" className="block mb-2 font-bold">
              Listing Type
            </label>
            <input
              type="text"
              id="listing_type"
              name="listing_type"
              value={property.listing_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sqft" className="block mb-2 font-bold">
              Square Feet
            </label>
            <input
              type="text"
              id="sqft"
              name="sqft"
              value={property.sqft}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2 font-bold">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={property.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="media" className="block mb-2 font-bold">
            Upload Images
          </label>
          <Dropzone onDrop={handleDrop} accept="image/*" multiple={true}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border border-gray-300 rounded p-4"
              >
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          <div className="mt-4 bg-white">
            {images.map((image, index) => (
              <div key={index} className="flex items-center mb-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => deleteImage(index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4  bg-white">
            {property.media.map((imageUrl, index) => (
              <div key={index} className="flex items-center mb-2">
                <img
                  src={imageUrl}
                  alt="existing"
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => deleteExistingImage(index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center bg-white">
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPropertyList;
