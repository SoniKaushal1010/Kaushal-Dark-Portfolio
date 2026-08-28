import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { BsSun, BsMoon } from "react-icons/bs";
import {
  FcHome,
  FcAbout,
  FcReadingEbook,
  FcBiotech,
  FcVideoProjector,
  FcPortraitMode,
  FcBusinessContact,
} from "react-icons/fc";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { to: "home", label: "Home", icon: <FcHome /> },
  { to: "about", label: "About", icon: <FcAbout /> },
  { to: "education", label: "Education", icon: <FcReadingEbook /> },
  { to: "techstack", label: "Tech Stack", icon: <FcBiotech /> },
  { to: "projects", label: "Projects", icon: <FcVideoProjector /> },
  { to: "work", label: "Work Experience", icon: <FcPortraitMode /> },
  { to: "contact", label: "Contact", icon: <FcBusinessContact /> },
];

const Sidebar = ({ open, setOpen }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`h-screen bg-gray-900 light:bg-white light:border-r light:border-gray-200 text-gray-200 light:text-gray-800 fixed left-0 top-0 flex flex-col overflow-y-auto transition-all duration-300 z-50 ${
        open ? "w-56" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center p-3 shrink-0">
        <button onClick={toggleTheme} className="text-gray-300 light:text-gray-600">
          {darkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
        </button>
        <button onClick={() => setOpen(!open)} className="text-gray-300 light:text-gray-600">
          {open ? <AiOutlineDoubleLeft size={22} /> : <AiOutlineDoubleRight size={22} />}
        </button>
      </div>

      {open && (
        <div className="flex justify-center mb-6 shrink-0">
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-700 light:border-gray-300"
          />
        </div>
      )}

      <nav className="flex flex-col gap-2 px-2 shrink-0">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            spy={true}
            smooth={true}
            offset={-80}
            duration={400}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-800 light:hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            {open && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="flex-1" />

      <RouterLink
        to="/admin/login"
        className="flex items-center gap-3 px-3 py-3 mx-2 mb-4 rounded-lg hover:bg-gray-800 light:hover:bg-gray-100 transition-colors border-t border-gray-800 light:border-gray-200 pt-4 shrink-0"
      >
        <RiAdminLine size={20} />
        {open && <span className="text-sm">Admin</span>}
      </RouterLink>
    </div>
  );
};

export default Sidebar;