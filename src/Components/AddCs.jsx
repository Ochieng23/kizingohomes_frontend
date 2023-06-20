import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function AddCs() {
  const [constructionSite, setConstructionSite] = useState({
    name: "",
    description: "",
    architecturalDesign: [],
    currentProgress: [],
    start_date: "",
    end_date: "",
    status: "",
  });

  const cloudinaryUploadPreset = "hcdgzzgi";
  const cloudinaryCloudName = "dhz4c0oae";

  const deleteImage = (imageType, index) => {
    setConstructionSite((prevConstructionSite) => {
      const newImages = [...prevConstructionSite[imageType]];
      newImages.splice(index, 1);
      return { ...prevConstructionSite, [imageType]: newImages };
    });
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);
    formData.append("api_key", cloudinaryCloudName);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const data = response.data;
      const fileURL = data.secure_url;
      return fileURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const uploadImages = async (imageType, files) => {
    const imageUrls = [];
    for (const file of files) {
      const fileURL = await uploadImage(file);
      imageUrls.push(fileURL);
    }

    setConstructionSite((prevConstructionSite) => ({
      ...prevConstructionSite,
      [imageType]: [...prevConstructionSite[imageType], ...imageUrls],
    }));

    console.log("Upload successful:", imageUrls);
    alert("Upload successful!");
  };

  const handleUploadAndSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found in local storage.");
        return;
      }

      await uploadImages(
        "architecturalDesign",
        constructionSite.architecturalDesign
      );
      await uploadImages("currentProgress", constructionSite.currentProgress);

      console.log(constructionSite);

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
            architecturalDesign: [],
            currentProgress: [],
            start_date: "",
            end_date: "",
            status: "",
          });
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
    setConstructionSite((prevConstructionSite) => ({
      ...prevConstructionSite,
      [name]: value,
    }));
  };

  const handleDrop = (acceptedFiles, imageType) => {
    uploadImages(imageType, acceptedFiles);
  };

  return (
    <div>
      <div className="w-80 border border-teal-600 mx-auto py-8 p-4 my-2 rounded-lg">
        <form onSubmit={handleUploadAndSubmit}>
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
              Architectural Design
            </label>
            <Dropzone
              onDrop={(acceptedFiles) =>
                handleDrop(acceptedFiles, "architecturalDesign")
              }
              accept="image/*"
              multiple={true}
            >
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
              {constructionSite.architecturalDesign.map((image, index) => (
                <div key={index} className="flex items-center mb-2">
                  <img
                    src={image}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => deleteImage("architecturalDesign", index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="media" className="block mb-2 font-bold">
              Current Progress
            </label>
            <Dropzone
              onDrop={(acceptedFiles) =>
                handleDrop(acceptedFiles, "currentProgress")
              }
              accept="image/*"
              multiple={true}
            >
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
              {constructionSite.currentProgress.map((image, index) => (
                <div key={index} className="flex items-center mb-2">
                  <img
                    src={image}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => deleteImage("currentProgress", index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
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
            <select
              id="status"
              name="status"
              value={constructionSite.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-4"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCs;
