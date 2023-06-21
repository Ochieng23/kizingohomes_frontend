import React, { useState, useEffect } from "react";
import ProjectCarousel from "./ProjectCarousel";
import { Link } from "react-router-dom";
import Context from "./Context";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/construction_sites")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.log(error));
  }, []);

  const truncateDescription = (description, wordCount) => {
    if (!description) {
      return "";
    }

    const words = description.split(" ");
    if (words.length <= wordCount) {
      return description;
    } else {
      const truncatedWords = words.slice(0, wordCount);
      return `${truncatedWords.join(" ")}...`;
    }
  };

  return (
    <div className="mb-2 m-5">
      <Context.Provider value={projects}>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-lg shadow dark:bg-teal-600 dark:border-gray-600"
              >
                <ProjectCarousel images={project.architecturalDesign} />
                <div className="p-5">
                  <Link to="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {project.name}
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-white dark:text-white">
                    {truncateDescription(project.description, 40)}
                  </p>
                  <Link
                    to={`/project/${project.id}`}
                    className="border rounded text-dark border-dark hover:border-transparent hover:text-dark-500 hover:bg-white inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-teal-600 dark:hover:bg-teal-600 dark:focus:ring-teal-800"
                  >
                    Read more
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No projects found.</p>
        )}
      </Context.Provider>
    </div>
  );
}

export default Projects;
