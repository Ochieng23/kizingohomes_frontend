import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";

function ProjectCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="relative">
      {/* Carousel wrapper */}
      <div className="relative h-56 md:h-96">
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
              src={imageUrl}
              className="absolute w-full  object-cover object-top rounded-t-lg  h-full object-cover object-top"
              alt="..."
            />

            {/* Overlay text */}
            {/* <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-teal-500 bg-opacity-50 text-dark shadow-md flex"> */}
            {/* <div className="flex-start">
                <strong className="text-bold text-black">
                  {imageUrl.text}
                </strong>
              </div> */}
            {/* <div className="flex-1">
                <strong className="text-sm text-black">
                  {imageUrl.description}{" "}
                </strong>
              </div> */}
            {/* <div className="flex-end">
                <Link className="text-sm inline-block  px-4 py-2 leading-none border rounded text-dark border-dark hover:border-transparent hover:text-dark-500 hover:bg-white mt-4 mr-2 lg:mt-0 ">
                  <strong>View</strong>
                </Link>
              </div> */}
            {/* </div> */}
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
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm sm:w-10 sm:h-10 bg-white/30 dark:bg-black-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-black-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>

        {/* Button content */}
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-80 px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm sm:w-10 sm:h-10 bg-white/30 dark:bg-black-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-black-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
        {/* Next button SVG */}
      </button>
    </div>
  );
}

export default ProjectCarousel;
