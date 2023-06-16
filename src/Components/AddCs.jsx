import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function AddCs() {
  const [constructionSite, setConstructionSite] = useState({
    name: "",
    description: "",
    media: "",
    start_date: "",
    end_date: "",
    status: "",
  });
  const [images, setImages] = useState([]);

  const cloudinaryUploadPreset = "hcdgzzgi";
  const cloudinaryCloudName = "dhz4c0oae";

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
      setConstructionSite((prevProperty) => ({
        ...prevProperty,
        media: imageUrls,
      }));

      console.log("Upload successful:", imageUrls);
      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConstructionSite((prevConstructionSite) => ({
      ...prevConstructionSite,
      [name]: value,
    }));
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
        const response = await fetch(
          "http://127.0.0.1:3000/construction_sites",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(constructionSite),
          }
        );

        if (response.ok) {
          console.log("Property created successfully");
          // Reset the property state and images
          setConstructionSite({
            name: "",
            description: "",
            media: [],
            start_date: "",
            end_date: "",
            status: "",
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

  const handleDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
  };

  return (
    <div>
      {" "}
      <div className="w-80 border border-teal-600 mx-auto py-8 p-4 my-2 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={constructionSite.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-4"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={constructionSite.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-4"
            ></textarea>
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
          <div className="mb-4">
            <label htmlFor="start_date" className="block text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={constructionSite.start_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-4"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="end_date" className="block text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={constructionSite.end_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-4"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700">
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={constructionSite.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-4"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Construction Site
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCs;
