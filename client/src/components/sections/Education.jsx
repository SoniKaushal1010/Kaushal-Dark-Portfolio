import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import API from "../../api/axios";

const Education = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/education").then((res) => setItems(res.data)).catch(console.error);
  }, []);

  return (
    <section id="education" className="min-h-screen flex items-center justify-center px-6 md:px-20">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-white light:text-gray-900">Education</h2>
        <div className="flex flex-col gap-6">
          {items.map((edu) => (
            <Fade key={edu._id}>
              <div className="bg-gray-900 light:bg-gray-50 rounded-xl p-5 border border-gray-800 light:border-gray-200">
                <h3 className="text-xl font-semibold text-white light:text-gray-900">{edu.degree}</h3>
                <p className="text-gray-400 light:text-gray-600">{edu.institution} • {edu.year}</p>
                {edu.description && <p className="text-gray-300 light:text-gray-700 mt-2">{edu.description}</p>}
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;