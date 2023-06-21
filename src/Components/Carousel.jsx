import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";

function Carousel() {
  const images = [
    {
      url: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1687353292/pngwbv1ofzl69g2moph7.avif",
      text: "Vipingo Heights",
      description: " Luxury two bedroom apartments starting from $200,000",
    },
    {
      url: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1687357100/bb5migtpqg2jw4br5x49.avif",
      text: "Nyali Beach Apartments",
      description: " Luxury two bedroom apartments starting from $200,000",
    },
    {
      url: "https://res.cloudinary.com/dhz4c0oae/image/upload/v1687357238/h1coppxt8cnnagwgbces.avif",
      text: "Diani Cottages",
      description: " Luxury two bedroom apartments starting from $200,000",
    },
    {
      url: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      text: "Buxton Furnished Apartments",
      description: " Luxury two bedroom apartments starting from $200,000",
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
              className="filter sm:w-aspect-1 h-aspect-1 md:w-aspect-1 h-aspect-1  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
              alt="..."
            />

            {/* Overlay text */}
            <div className="w-full sm:w-auto mb-1 sm:mb-0 sm:mr-0 sm:text- absolute bottom-0 left-0 right-0 py-2 px-4 bg-teal-500 bg-opacity-50 text-dark shadow-md flex">
              <div className="flex-start">
                <strong className="text-bold text-black">
                  {imageUrl.text}
                </strong>
              </div>
              <div className="flex-1">
                <strong className="text-sm text-black">
                  {imageUrl.description}{" "}
                </strong>
              </div>
              <div className="flex-end">
                <Link className="text-sm  inline-block  px-4 py-2 leading-none border rounded text-dark border-dark hover:border-transparent hover:text-dark-500 hover:bg-white mb-2 mr-2 lg:mt-0 ">
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
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-80 px-4 cursor-pointer group focus:outline-none "
        data-carousel-prev
        onClick={prevSlide}
      >
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-sm sm:w-10 sm:h-10 bg-white/30 dark:bg-black-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-black-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span class="sr-only">Previous</span>
        </span>

        {/* Button content */}
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-80 px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-sm sm:w-10 sm:h-10 bg-white/30 dark:bg-black-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-black-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span class="sr-only">Next</span>
        </span>
        {/* Next button SVG */}
      </button>
    </div>
  );
}

export default Carousel;
