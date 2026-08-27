import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Education from "../components/sections/Education";
import TechStack from "../components/sections/TechStack";
import Projects from "../components/sections/Projects";
import WorkExperience from "../components/sections/WorkExperience";
import Contact from "../components/sections/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="bg-gray-950 light:bg-white text-white light:text-gray-900 min-h-screen">
      <Hero />
      <About />
      <Education />
      <TechStack />
      <Projects />
      <WorkExperience />
      <Contact />
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Home;