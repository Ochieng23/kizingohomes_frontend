import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";

function Carousel() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      text: "Vipingo Heights",
      description: " Luxury two bedroom apartment starting from $200,000",
    },
    {
      url: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      text: "Nyali Beach Apartments",
      description: " Luxury two bedroom apartment starting from $200,000",
    },
    {
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      text: "Diani Cottages",
      description: " Luxury two bedroom apartment starting from $200,000",
    },
    {
      url: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      text: "Buxton Furnished Apartments",
      description: " Luxury two bedroom apartment starting from $200,000",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      id="animation-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-none md:h-96">
        {/* Carousel items */}
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`duration-200 ease-linear ${
              index === activeIndex ? "block" : "hidden"
            }`}
            data-carousel-item={index === activeIndex ? "active" : ""}
          >
            <img
              src={imageUrl.url}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-100 object-cover"
              alt="..."
            />

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-black bg-opacity-50 text-white shadow-md flex">
              <div className="flex-start">
                <strong className="text-bold ">{imageUrl.text}</strong>
              </div>
              <div className="flex-1">
                <strong className="text-sm ">{imageUrl.description} </strong>
              </div>
              <div className="flex-end">
                <Link className="text-sm inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 mr-2 lg:mt-0 ">
                  <strong>View</strong>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        {/* Previous button SVG */}
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        {/* Next button SVG */}
      </button>
    </div>
  );
}

export default Carousel;
