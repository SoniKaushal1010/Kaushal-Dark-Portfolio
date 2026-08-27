import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import API from "../../api/axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects").then((res) => setProjects(res.data)).catch(console.error);
  }, []);

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 md:px-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-white light:text-gray-900">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <Fade key={proj._id}>
              <div className="bg-gray-900 light:bg-gray-50 rounded-xl p-5 border border-gray-800 light:border-gray-200">
                {proj.image && (
                  <img src={proj.image} alt={proj.title} className="rounded-lg mb-3 w-full h-40 object-cover" />
                )}
                <h3 className="text-xl font-semibold text-white light:text-gray-900">{proj.title}</h3>
                <p className="text-gray-400 light:text-gray-600 text-sm mt-1">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {proj.techStack?.map((t) => (
                    <span key={t} className="text-xs bg-gray-800 light:bg-gray-200 text-gray-200 light:text-gray-800 rounded-full px-2 py-1">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 mt-3 text-sm">
                  {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-blue-400 light:text-blue-600">Live</a>}
                  {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-blue-400 light:text-blue-600">GitHub</a>}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;