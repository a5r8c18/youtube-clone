import React from "react";
import { useSelector } from "react-redux";
import { CiHome } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary, MdPlaylistPlay, MdOutlineHistory, MdOutlineWatchLater, MdOutlineExpandMore, MdOutlineExplore } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";

// Definition of the sidebar elements with their icons and titles
const sidebarItems = [
  {
    icon: <CiHome size="24px" className="text-black dark:text-white" />,
    title: "Home",
  },
  {
    icon: <SiYoutubeshorts size="24px" className="text-black dark:text-white" />,
    title: "Shorts",
  },
  {
    icon: <MdOutlineSubscriptions size="24px" className="text-black dark:text-white" />,
    title: "Subscriptions",
  },
  // Divider before Explore
  {
    type: "divider",
  },
  {
    icon: <MdOutlineExplore size="24px" className="text-black dark:text-white" />,
    title: "Explore",
  },
  {
    icon: <MdOutlineVideoLibrary size="24px" className="text-black dark:text-white" />,
    title: "Library",
  },
  {
    icon: <MdOutlineHistory size="24px" className="text-black dark:text-white" />,
    title: "History",
  },
  {
    icon: <MdPlaylistPlay size="24px" className="text-black dark:text-white" />,
    title: "Playlists",
  },
  {
    icon: <MdOutlineWatchLater size="24px" className="text-black dark:text-white" />,
    title: "Watch Later",
  },
  {
    icon: <AiOutlineLike size="24px" className="text-black dark:text-white" />,
    title: "Liked Videos",
  },
  {
    type: "divider",
  },
  {
    icon: <MdOutlineExpandMore size="24px" className="text-black dark:text-white" />,
    title: "Show More",
  },
];

// Sidebar Component
const Sidebar = () => {
  // Get the 'open' state from the Redux store to determine if the sidebar is open or closed
  const open = useSelector((store) => store.app.open);

  return (
    // Main sidebar container
    <div className={`flex flex-col p-4 bg-white dark:bg-gray-800 h-full ${open ? "w-64" : "w-20"} transition-width duration-300`}>
      {/* Mapping sidebar elements */}
      {sidebarItems.map((item, index) => (
        // Check if the item is a divider
        item.type === "divider" ? (
          <hr key={index} className="border-t border-gray-200 dark:border-gray-600 my-2" />
        ) : (
          // Each sidebar element with a link
          <Link to={item.path || "#"} key={index} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            {/* Element icon */}
            <div className="mr-4">{item.icon}</div>
            {/* Item title, shown only if the sidebar is open */}
            <div className={`${open ? "block" : "hidden"} text-sm font-medium dark:text-white`}>{item.title}</div>
          </Link>
        )
      ))}
    </div>
  );
};

export default Sidebar;

