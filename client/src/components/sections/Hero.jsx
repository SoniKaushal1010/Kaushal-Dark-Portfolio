import { Fade } from "react-awesome-reveal";

const Hero = () => (
  <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <Fade cascade damping={0.2}>
      <img
        src="/profile.jpg"
        alt="Kaushal Soni"
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 light:border-gray-300 mb-6"
      />
      <h1 className="text-5xl font-bold mb-2 text-white light:text-gray-900">Kaushal Soni</h1>
      <p className="text-xl text-gray-400 light:text-gray-600">Full Stack Developer (MERN)</p>
    </Fade>
  </section>
);

export default Hero;