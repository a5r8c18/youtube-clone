import React from "react";
import { useSelector } from "react-redux";
import { CiHome } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary, MdPlaylistPlay, MdOutlineHistory, MdOutlineWatchLater, MdOutlineThumbUp, MdOutlineExpandMore, MdOutlineExplore } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";

// Definición de los elementos de la barra lateral con sus íconos y títulos
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
    icon: <MdOutlineExpandMore size="24px" className="text-black dark:text-white" />,
    title: "Show More",
  },
];

// Componente de la Barra Lateral
const Sidebar = () => {
  // Obtener el estado 'open' del store de Redux para determinar si la barra lateral está abierta o cerrada
  const open = useSelector((store) => store.app.open);

  return (
    // Contenedor principal de la barra lateral
    <div className={`flex flex-col p-4 bg-white dark:bg-gray-800 h-full ${open ? "w-64" : "w-20"} transition-width duration-300`}>
      {/* Mapear los elementos de la barra lateral */}
      {sidebarItems.map((item, index) => (
        // Cada elemento de la barra lateral
        <div key={index} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          {/* Ícono del elemento */}
          <div className="mr-4">{item.icon}</div>
          {/* Título del elemento, mostrado solo si la barra lateral está abierta */}
          <div className={`${open ? "block" : "hidden"} text-sm font-medium dark:text-white`}>{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
