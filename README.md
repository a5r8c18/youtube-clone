A responsive YouTube clone application built with React, TailwindCSS, Redux, and various other modern web development tools. This project demonstrates the implementation of core features such as video listing, search functionality, live chat, and more.

Features

    Responsive design using TailwindCSS

    Video listing and search functionality

    Live chat with simulated messages

    Dark mode toggle

    User authentication simulation

    Redux for state management

    Axios for API requests

    Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
Prerequisites

Ensure you have the following tools installed on your local development environment:

NodeJs
npm
Git

Installation

    Clone the repository:
    git clone https://github.com/your-username/youtube-clone.git
    cd youtube-clone
    Install the dependencies:
    npm install
   Create a .env file in the root directory and add your YouTube API key:
   REACT_APP_YOUTUBE_API_KEY=your_api_key_here

   Usage

To start the development server, run:
npm start

Components
ButtonList

Displays a list of buttons with horizontal scrolling functionality, allowing users to filter videos by category.
ChatMessage

Displays individual chat messages in the live chat section.
Feed

Displays the main content feed, including ButtonList and VideoPlayer components.
Home

Contains the main navigation bar, search functionality, and toggles for dark mode and sidebar.
LiveChat

Simulates live chat messages with random names and messages, updating every second.
Sidebar

Displays the navigation sidebar with links to different sections of the application.
VideoCart

Displays video thumbnails and information for individual videos.
Watch

Displays the video player, video details, and live chat section.
State Management

State management is handled using Redux with the following slices:
appSlice

Manages the state of the application, including sidebar visibility, video data, selected category, and search suggestions.
chatSlice

Manages the state of the chat messages, maintaining a list of messages with a maximum of 100 entries.
API Integration

The application integrates with the YouTube Data API to fetch video data. The API key is stored in the .env file and accessed via the youtube.js constants.
Testing

The project includes unit tests for various components and Redux slices using Jest and React Testing Library. Test files are named with the .test.js extension and placed in the same directory as the components they test.

To run the tests, use the following command:

npm test

Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

Additional Information

This project adheres to the following guidelines and criteria:

    Frontend: Built using React.

    Styling: Done using TailwindCSS without the use of libraries like Material UI or Bootstrap.

    Navigation: Implemented using React Router.

    External APIs:

        Video data: Uses YouTube's Data API or a mock API like JSONPlaceholder.

        Chat functionality: Simulated using WebSocket services like Pusher or a mock service.

        Login simulation: Uses services like ReqRes or similar.

    Git Workflow: Includes meaningful commit messages.

Stretch Goals (Optional)

    Search Bar: Allows filtering of videos based on a query.

    User Avatars: Displays avatars in the chat interface.

    Like/Subscribe Button: Includes a simulated backend response for like or subscribe actions.

Evaluation Criteria

    Code Quality: Clean, modular, and reusable code.

    UI/UX: Responsive and visually appealing interface.

    Functionality: Adherence to the core feature requirements.

    Input Validations: Robust validation logic with user feedback.

    Testing: Proper coverage of core functionality with automated tests.

    Documentation: Clear instructions on how to run the project.

    Creativity: Unique touches or enhancements beyond the minimum requirements.

