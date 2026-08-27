import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import API from "../../api/axios";

const WorkExperience = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/experience").then((res) => setItems(res.data)).catch(console.error);
  }, []);

  return (
    <section id="work" className="min-h-screen flex items-center justify-center px-6 md:px-20">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-white light:text-gray-900">Work Experience</h2>
        <div className="flex flex-col gap-6">
          {items.map((exp) => (
            <Fade key={exp._id}>
              <div className="bg-gray-900 light:bg-gray-50 rounded-xl p-5 border border-gray-800 light:border-gray-200">
                <h3 className="text-xl font-semibold text-white light:text-gray-900">{exp.role}</h3>
                <p className="text-gray-400 light:text-gray-600">{exp.company} • {exp.duration}</p>
                {exp.description && <p className="text-gray-300 light:text-gray-700 mt-2">{exp.description}</p>}
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;