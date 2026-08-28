import { useState } from "react";
import Sidebar from "./Sidebar";
import Home from "../../pages/Home";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-gray-950 light:bg-white min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />
      <div className={`flex-1 transition-all duration-300 ${open ? "ml-56" : "ml-16"}`}>
        <Home />
      </div>
    </div>
  );
};

export default Layout;