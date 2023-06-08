import React, { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    role: "house_seeker", // Set the default role value to "house_seeker"
  });
  const [User, setUser] = useState("");
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "role" ? value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const { jwt, user, role } = data;
        localStorage.setItem("jwt", jwt);
        setUser(user);
        localStorage.setItem("userRole", role);
        window.location.href = "/login";
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  return (
    <div className="max-w-sm mx-auto rounded-lg shadow dark:border dark:border-gray-700 my-2 p-4">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
          Create an account
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 font-bold">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password_confirmation"
            className="block mb-2 font-bold"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            placeholder="*******"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block mb-2 font-bold hidden">
            Role
          </label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            className="w-full px-3 py-2 border hidden border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            required
          >
            <option value="house_seeker">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg"
        >
          Register
        </button>
        <p className="text-sm font-light text-dark-500 dark:text-black-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login here
          </Link>
        </p>

        {errors.length > 0 && (
          <div className="mt-4 text-red-500">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
