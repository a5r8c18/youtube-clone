import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch, CiDark, CiLight } from "react-icons/ci";
import Avatar from "react-avatar";
import { FaMicrophone } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, setCategory, setSearchSuggestion } from "../utils/appSlice";
import { SEARCH_SUGGESTIONS_API } from "../constant/youtube";
import axios from "axios";

const Home = () => {
  // Declare state variables
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Get the dispatch function from Redux
  const dispatch = useDispatch();
  
  // Get search suggestions from the Redux store
  const { searchSuggestion } = useSelector((store) => store.app);

  // Function to handle video search
  const searchVideo = () => {
    dispatch(setCategory(input));
    setInput("");
  };

  // Function to toggle the sidebar
  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };

  // Function to open search suggestions
  const openSuggestion = () => {
    setSuggestion(true);
  };

  // useEffect hook to fetch search suggestions
  useEffect(() => {
    const showSuggestion = async () => {
      try {
        const res = await axios.get(SEARCH_SUGGESTIONS_API + input);
        dispatch(setSearchSuggestion(res?.data[1]));
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(() => {
      showSuggestion();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [input, dispatch]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className="flex fixed top-0 justify-center items-center w-[100%] z-10 bg-white dark:bg-gray-800">
      <div className="flex w-[96%] py-3 justify-between items-center">
        <div className="flex items-center">
          {/* Hamburger menu icon for toggling the sidebar */}
          <GiHamburgerMenu onClick={toggleHandler} size="24px" className="cursor-pointer text-black dark:text-white mr-4" />
          {/* YouTube logo */}
          <img className="px-4" width={"115px"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/768px-YouTube_Logo_2017.svg.png" alt="yt_logo" />
        </div>
        <div className="flex w-[40%] items-center">
          <div className="flex w-[100%]">
            {/* Input field for searching videos */}
            <input
              value={input}
              onFocus={openSuggestion}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 border border-gray-400 rounded-l-full outline-none"
            />
            {/* Search button */}
            <button onClick={searchVideo} className="py-2 border border-gray-400 rounded-r-full px-4">
              <CiSearch size="24px" className="text-black dark:text-white" />
            </button>
          </div>
          {/* Microphone icon */}
          <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full mx-2">
            <FaMicrophone size="24px" className="cursor-pointer text-black dark:text-white" />
          </div>
          {/* Search suggestions dropdown */}
          {suggestion && searchSuggestion.length !== 0 && (
            <div className="absolute top-3 z-50 w-3/5 py-5 bg-white dark:bg-gray-700 shadow-lg mt-12 rounded-lg border border-gray-200">
              <ul>
                {searchSuggestion.map((text, idx) => (
                  <div key={idx} className="flex items-center px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <CiSearch size="24px" className="text-black dark:text-white" />
                    <li className="px-2 py-1 cursor-pointer text-md font-medium text-black dark:text-white">{text}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex w-1/5 items-center">
          {/* Create icon with text */}
          <div className="flex items-center p-2 bg-gray-200 dark:bg-gray-600 rounded-3xl cursor-pointer text-black dark:text-white mx-2">
            <GoPlus size="24px" />
            <span className="ml-2">Crear</span>
          </div>
          {/* Notification icon */}
          <IoIosNotificationsOutline size="24px" className="cursor-pointer text-black dark:text-white mx-2" />
          {/* Dark mode toggle */}
          <div onClick={toggleDarkMode} className="cursor-pointer mx-2">
            {darkMode ? <CiLight size="24px" className="text-black dark:text-white" /> : <CiDark size="24px" className="text-black dark:text-white" />}
          </div>
          {/* Avatar icon */}
          <Avatar src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" size={35} round={true} className="text-black dark:text-white ml-6" />
        </div>
      </div>
    </div>
  );
};

export default Home;
