import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';

// Define the VideoCart component that accepts a prop 'item'
const VideoCart = ({ item }) => {
  // Declare a state variable 'ytIcon' to store the URL of the YouTube channel icon
  const [ytIcon, setYtIcon] = useState('');

  // useEffect hook to run side effects, in this case, fetching the YouTube channel icon
  useEffect(() => {
    // Define an asynchronous function to fetch the YouTube channel icon
    const getYoutubeChannelName = async () => {
      try {
        // Make a GET request to the YouTube API to fetch the channel details
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=YOUR_API_KEY`);
        // Set the fetched icon URL to the 'ytIcon' state variable
        setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
      } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
      }
    };

    // Call the function to fetch the YouTube channel icon
    getYoutubeChannelName();
  }, [item.snippet.channelId]); // The effect will run again if 'item.snippet.channelId' changes

  return (
    // Main container for the video card with some styling classes
    <div className='w-94 cursor-pointer my-2 dark:bg-gray-800 dark:text-white rounded-xl'>
      {/* Image of the video with rounded corners */}
      <img className='rounded-xl w-full' src={item.snippet.thumbnails.medium.url} alt="ytvideo" />
      <div>
        <div className='flex mt-2'>
          {/* Display the channel's icon using the Avatar component */}
          <Avatar src={ytIcon} size={35} round={true} />
          <div className='ml-2'>
            {/* Display the video's title and channel name */}
            <h1 className='font-bold dark:text-white'>{item.snippet.title}</h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>{item.snippet.channelTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the VideoCart component as the default export
export default VideoCart;


