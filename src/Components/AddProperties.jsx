import { useState } from 'react';
import 'tailwindcss/tailwind.css';

const AddProperties = () => {
  const [property, setProperty] = useState({
    name: '',
    location: '',
    description: '',
    listing_type: '',
    sqft: '',
    price: '',
    media: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });

      if (response.ok) {
        console.log('Property created successfully');
        // Reset the form after successful submission
        setProperty({
          name: '',
          location: '',
          description: '',
          listing_type: '',
          sqft: '',
          price: '',
          media: [],
        });
      } else {
        console.error('Error creating property');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const mediaUrls = files.map((file) => URL.createObjectURL(file));
    setProperty((prevProperty) => ({
      ...prevProperty,
      media: mediaUrls,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto border border-teal-500 my-2 p-4 " >
      <div className="mb-4" >
        <label htmlFor="name" className="block mb-2 font-bold">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Nyali Beach Apartments'
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
          placeholder='Nyali-Mombasa'
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
          placeholder='This is a luxury property located in the serene...'
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
          placeholder='rent or buy '
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
          placeholder='3000'
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
          placeholder='$120000'
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
        <input
          type="file"
          id="media"
          name="media"
          onChange={handleMediaChange}
          className="w-full"
          multiple
        />
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
