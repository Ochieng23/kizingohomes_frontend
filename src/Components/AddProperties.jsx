import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

const AddProperties = () => {
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

  const cloudinaryUploadPreset = "hcdgzzgi";
  const cloudinaryCloudName = "dhz4c0oae";

  const handleDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
  };

  const uploadImages = async () => {
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

    try {
      const imageUrls = await axios.all(uploaders);
      setProperty((prevProperty) => ({
        ...prevProperty,
        media: imageUrls,
      }));

      console.log("Upload successful:", imageUrls);
      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadImages();

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found in local storage.");
        return;
      }

      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const userCode = decodedToken.user_ref;

      try {
        const response = await fetch("http://127.0.0.1:3000/properties", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property),
        });

        if (response.ok) {
          console.log("Property created successfully");
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
        } else {
          console.error("Error creating property");
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
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto border border-teal-500 my-2 p-4"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nyali Beach Apartments"
          value={property.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          required
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
          placeholder="Nyali-Mombasa"
          value={property.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-bold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="This is a luxury property located in the serene..."
          value={property.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="listing_type" className="block mb-2 font-bold">
          Listing Type
        </label>
        <input
          type="text"
          id="listing_type"
          name="listing_type"
          placeholder="rent or buy "
          value={property.listing_type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          required
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
          placeholder="3000"
          value={property.sqft}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block mb-2 font-bold">
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="$120000"
          value={property.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="media" className="block mb-2 font-bold">
          Media
        </label>
        <Dropzone
          onDrop={handleDrop}
          multiple={true}
          accept="image/*"
          style={{
            border: "1px dashed #ccc",
            padding: "20px",
            textAlign: "center",
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drop your files or click here to upload</p>
            </div>
          )}
        </Dropzone>
        {images.length > 0 && (
          <div className="mt-2">
            <p>Selected Files:</p>
            <ul>
              {images.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Property
      </button>
    </form>
  );
};

export default AddProperties;
