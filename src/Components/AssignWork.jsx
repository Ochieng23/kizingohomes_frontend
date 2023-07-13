import React, { useState } from "react";

const AssignWork = () => {
  const [formData, setFormData] = useState({
    construction_site_id: "",
    staff_id: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found in local storage.");
      return;
    }

    const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
    const userCode = decodedToken.user_ref;

    try {
      const response = await fetch(
        "http://localhost:3000/constructionsitesworkers",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            construction_site_id: formData.construction_site_id,
            staff_id: formData.staff_id,
          }),
        }
      );

      if (response.ok) {
        alert("Construction site created successfully!");

        setFormData({ construction_site_id: "", staff_id: "" });
        setError(null);
      }
    } catch (error) {
      console.error("Error creating construction site:", error);
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.error ||
          "An error occurred while creating the construction site.";
        setError(errorMessage);
      } else {
        setError("An error occurred while creating the construction site.");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-xl font-bold mb-4">Assign Work</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white rounded-lg shadow-md p-6"
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label
            htmlFor="construction_site_id"
            className="block text-gray-700 font-bold mb-2"
          >
            Construction Site ID:
          </label>
          <input
            type="number"
            id="construction_site_id"
            name="construction_site_id"
            value={formData.construction_site_id}
            onChange={handleChange}
            required
            className="form-input w-full border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="staff_id"
            className="block text-gray-700 font-bold mb-2"
          >
            Staff ID:
          </label>
          <input
            type="number"
            id="staff_id"
            name="staff_id"
            value={formData.staff_id}
            onChange={handleChange}
            required
            className="form-input w-full border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignWork;
