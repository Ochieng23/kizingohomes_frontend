import React, { useState } from "react";
import axios from "axios";

const AddStaff = () => {
  const initialState = {
    name: "",
    age: 0,
    phone_number: "",
    national_id: "",
    payrate: "",
  };

  const [formData, setFormData] = useState(initialState);
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!accessToken) {
      console.error("Access token not found in local storage.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:3000/staffs", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      alert("Staff created successfully!");

      setFormData(initialState);
    } catch (error) {
      console.error("Error creating staff:", error);
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
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto border border-teal-600 my-2 p-4 rounded-lg mt-5 "
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input w-full border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="form-input w-full border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone_number"
          className="block text-gray-700 font-bold mb-2"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="form-input w-full border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="national_id"
          className="block text-gray-700 font-bold mb-2"
        >
          National ID
        </label>
        <input
          type="text"
          id="national_id"
          name="national_id"
          value={formData.national_id}
          onChange={handleChange}
          className="form-input w-full border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="payrate" className="block text-gray-700 font-bold mb-2">
          Pay Rate
        </label>
        <input
          type="text"
          id="payrate"
          name="payrate"
          value={formData.payrate}
          onChange={handleChange}
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
  );
};

export default AddStaff;
