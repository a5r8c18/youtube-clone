import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../utils/appSlice';
import { GrNext, GrPrevious } from 'react-icons/gr';


const buttonList = ["All", "Javascript", "Java", "Live", "Music", "Songs", "Vlogs", "Trending", "Programming", "News", "Technology", "Cricket", "Comedy", "Thriller", "New to you", "Computer Programming", "Netlify", "Coding"];

// Componente ButtonList
const ButtonList = () => {
  // State to track the currently active button
  const [active, setActive] = useState("All");
  // States to control the visibility of the scroll buttons
  const [showNext, setShowNext] = useState(true);
  const [showPrevious, setShowPrevious] = useState(false);
  // Reference to the scroll container
  const scrollContainerRef = useRef(null);
  // Getting the dispatch function from Redux
  const dispatch = useDispatch();

  // Function to handle button clicks
  const videoByTag = (tag) => {
    // If the clicked button is not already active
    if (active !== tag) {
      // Dispatch an action to set the category in the Redux store
      dispatch(setCategory(tag));
      // Update the active state to the clicked button
      setActive(tag);
    }
  }

  // Function to scroll to the right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 150;
      updateScrollButtons();
    }
  }

  // Function to scroll to the left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 150;
      updateScrollButtons();
    }
  }

  // Function to update the visibility of the scroll buttons
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowPrevious(scrollLeft > 0);
      setShowNext(scrollLeft < scrollWidth - clientWidth);
    }
  }

  // Effect to update the scroll buttons when the component mounts
  useEffect(() => {
    updateScrollButtons();
  }, []);
  return (
    <div className='flex items-center w-full my-1'>
      {/* Icon to scroll to the left */}
      {showPrevious && (
        <button onClick={scrollLeft} className='p-2'>
          <GrPrevious size="24px" />
        </button>
      )}
      {/* Container for the button list with horizontal scrolling */}
      <div ref={scrollContainerRef} className='flex overflow-x-auto scrollbar-hide w-full' onScroll={updateScrollButtons}>
        {
          // Iterate over the buttonList array to create buttons
          buttonList.map((buttonName, index) => {
            return (
              // Each button wrapped in a div with a unique key
              <div key={index}>
                <button 
                  onClick={() => { videoByTag(buttonName) }} 
                  className={`${active === buttonName ? "bg-slate-900 text-white dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-800 dark:text-white"} w-fit font-medium mx-1 cursor-pointer px-3 py-2 rounded-lg`}
                >
                  {/* Button label */}
                  <span className="whitespace-nowrap">{buttonName}</span>
                </button>
              </div>
            )
          })
        }
      </div>
      {/* Icon to scroll to the right */}
      {showNext && (
        <button onClick={scrollRight} className='p-2'>
          <GrNext size="24px" />
        </button>
      )}
    </div>
  )
}


export default ButtonList;

