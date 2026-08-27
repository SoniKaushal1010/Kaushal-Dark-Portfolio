import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import API from "../../api/axios";

const TechStack = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    API.get("/skills").then((res) => setSkills(res.data)).catch(console.error);
  }, []);

  return (
    <section id="techstack" className="min-h-screen flex items-center justify-center px-6 md:px-20">
      <div className="max-w-3xl w-full text-center">
        <h2 className="text-3xl font-bold mb-8 text-white light:text-gray-900">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <Fade key={skill._id}>
              <span className="bg-gray-900 light:bg-gray-100 border border-gray-800 light:border-gray-300 text-gray-200 light:text-gray-800 rounded-full px-4 py-2 text-sm">
                {skill.name}
              </span>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;