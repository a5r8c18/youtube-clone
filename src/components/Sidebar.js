import React from "react";
import { useSelector } from "react-redux";
import { CiHome, SiYoutubeshorts, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineHistory, MdOutlineWatchLater, MdOutlineThumbUp, MdOutlineExpandMore, AiOutlineLike } from "react-icons";

// Define the items to be displayed in the sidebar
const sidebarItems = [
  {
    icon: <CiHome size="24px" />,
    title: "Home",
  },
  {
    icon: <SiYoutubeshorts size="24px" />,
    title: "Shorts",
  },
  {
    icon: <MdOutlineSubscriptions size="24px" />,
    title: "Subscriptions",
  },
  {
    icon: <MdOutlineVideoLibrary size="24px" />,
    title: "Library",
  },
  {
    icon: <MdOutlineHistory size="24px" />,
    title: "History",
  },
  {
    icon: <MdOutlineWatchLater size="24px" />,
    title: "Watch Later",
  },
  {
    icon: <AiOutlineLike size="24px" />,
    title: "Liked Videos",
  },
  {
    icon: <MdOutlineExpandMore size="24px" />,
    title: "Show More",
  },
];

// Define the Sidebar component
const Sidebar = () => {
  // Get the 'open' state from the Redux store
  const open = useSelector((store) => store.app.open);

  return (
    // Set the sidebar's width based on the 'open' state
    <div className={`flex flex-col p-4 bg-white h-full ${open ? "w-64" : "w-20"} transition-width duration-300`}>
      {sidebarItems.map((item, index) => (
        // Render each sidebar item
        <div key={index} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
          <div className="mr-4">{item.icon}</div>
          <div className={`${open ? "block" : "hidden"} text-sm font-medium`}>{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;