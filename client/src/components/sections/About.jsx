import { Fade } from "react-awesome-reveal";

const About = () => (
  <section id="about" className="min-h-screen flex items-center justify-center px-6 md:px-20">
    <Fade>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-white light:text-gray-900">About Me</h2>
        <p className="text-gray-300 light:text-gray-700 leading-relaxed">
          I'm Kaushal Soni, a Computer Engineering graduate and aspiring Full
          Stack Web Developer specializing in the MERN stack (MongoDB, Express,
          React, Node.js). As a fresher actively seeking opportunities in web
          development, I'm sharpening my skills through hands-on projects like
          this portfolio, with the goal of building a strong foundation for
          interviews and landing a role where I can grow as a developer while
          contributing real value to a team.
        </p>
      </div>
    </Fade>
  </section>
);

export default About;