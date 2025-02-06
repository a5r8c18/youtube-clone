import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

// Body component definition
const Body = () => {
  return (
    // Main container with flex layout and top margin
    <div className="flex mt-16">
      {/* Render the Sidebar component */}
      <Sidebar />
      {/* Render the matched child route component */}
      <Outlet />
    </div>
  );
}

export default Body;