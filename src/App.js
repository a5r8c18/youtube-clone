import Home from './pages/Home'; 
import Body from './components/Body'; 
import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Watch from "./components/Watch";
import Feed from "./components/Feed";


// Define the routes for the application using createBrowserRouter
const appRouter = createBrowserRouter([
  {
    // Root path
    path: "/",
    // Main component to render for the root path
    element: <Body />,
    // Define child routes
    children: [
      {
        // Default child route (same as root path)
        path: "/",
        // Component to render for the default child route
        element: <Feed />
      },
      {
        // Path for the watch page
        path: "/watch",
        // Component to render for the watch page
        element: <Watch />
      },
      {
        // Path for the watch page
        path: "/",
        // Component to render for the watch page
        element: <Home />
      }
    ]
  }
]);

// Main App component
function App() {
  return (
    <div>
      {/* Render the Home component */}
      <Home />
      {/* Provide the router to the application */}
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;