import React from "react";
import { useSelector } from "react-redux";
import { CiHome } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary,MdPlaylistPlay, MdOutlineHistory, MdOutlineWatchLater, MdOutlineThumbUp, MdOutlineExpandMore } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";

// Definition of the sidebar elements with their icons and titles
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
    icon: <MdPlaylistPlay size="24px" />,
    title: "Playlists",
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

// Sidebar Component
const Sidebar = () => {
  //Get the 'open' state of the Redux store to determine if the sidebar is open or closed
  const open = useSelector((store) => store.app.open);

  return (
    // Main sidebar container
    <div className={`flex flex-col p-4 bg-white h-full ${open ? "w-64" : "w-20"} transition-width duration-300`}>
      {/* Mapping sidebar elements */}
      {sidebarItems.map((item, index) => (
        // Each sidebar element
        <div key={index} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
          {/* Element icon */}
          <div className="mr-4">{item.icon}</div>
          {/* Item title, shown only if the sidebar is open */}
          <div className={`${open ? "block" : "hidden"} text-sm font-medium`}>{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;