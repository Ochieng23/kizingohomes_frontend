import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "./Context";

function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/construction_sites/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      .catch((error) => console.log(error));
  }, [id]);

  console.log(project);

  return (
    <div>
      <Context.Provider value={project}>
        {project && (
          <>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            {/* Render architectural designs and current progress images */}
            {project.architecturalDesign &&
              project.architecturalDesign.map((design, index) => (
                <img
                  key={`design-${index}`}
                  src={design}
                  alt={`Design ${index + 1}`}
                />
              ))}
            {project.currentProgress &&
              project.currentProgress.map((progress, index) => (
                <img
                  key={`progress-${index}`}
                  src={progress}
                  alt={`Progress ${index + 1}`}
                />
              ))}
          </>
        )}
      </Context.Provider>
    </div>
  );
}

export default ProjectPage;
