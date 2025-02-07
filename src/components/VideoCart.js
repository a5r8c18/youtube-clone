import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';

const VideoCart = ({ item }) => {
  const [ytIcon, setYtIcon] = useState('');

  const getYoutubeChannelName = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=YOUR_API_KEY`);
      setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getYoutubeChannelName();
  }, []);

  return (
    <div className='w-94 cursor-pointer my-2 dark:bg-gray-800 dark:text-white'>
      <img className='rounded-xl w-full' src={item.snippet.thumbnails.medium.url} alt="ytvideo" />
      <div>
        <div className='flex mt-2'>
          <Avatar src={ytIcon} size={35} round={true} />
          <div className='ml-2'>
            <h1 className='font-bold dark:text-white'>{item.snippet.title}</h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>{item.snippet.channelTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCart;