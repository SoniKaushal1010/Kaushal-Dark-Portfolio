import { useState } from "react";
import Sidebar from "./Sidebar";
import Home from "../../pages/Home";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex overflow-hidden bg-gray-950 light:bg-white"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <Sidebar open={open} setOpen={setOpen} />
      <div id="scroll-container" className="flex-1 overflow-y-auto">
        <Home />
      </div>
    </div>
  );
};

export default Layout;