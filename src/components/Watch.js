import React, { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { useSearchParams } from "react-router-dom"; // Importing useSearchParams to access query parameters
import API_KEY from '../constant/youtube'; // Importing API key from constants
import axios from "axios"; // Importing axios for making HTTP requests
import Avatar from "react-avatar"; // Importing Avatar component for displaying user avatars
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai"; 
import { PiShareFatLight } from "react-icons/pi"; 
import { GoDownload } from "react-icons/go"; 
import { BsThreeDotsVertical } from "react-icons/bs"; 
import { LuSendHorizonal } from "react-icons/lu"; 
import LiveChat from './LiveChat'; 
import { useDispatch } from "react-redux"; // Importing useDispatch hook for dispatching actions
import { setMessage } from "../utils/chatSlice"; // Importing setMessage action from the chatSlice

// Watch component
const Watch = () => {
    const [input, setInput] = useState(""); // State for user input in chat
    const [singleVideo, setSingleVideo] = useState(null); // State for storing video data
    const [liked, setLiked] = useState(false); // State for managing like status
    const [disliked, setDisliked] = useState(false); // State for managing dislike status
    const [searchParams] = useSearchParams(); // Hook to get query parameters
    const videoId = searchParams.get('v'); // Extracting video ID from query parameters
    const dispatch = useDispatch(); // Hook to dispatch actions

    // Function to handle sending a message in the chat
    const sendMessage = () => {
        dispatch(setMessage({ name: "Patel", message: input })); // Dispatching setMessage action with user input
        setInput(""); // Clearing the input field
    }

    // Function to handle the like button click
    const handleLike = () => {
        setLiked(!liked); // Toggling the liked state
        if (disliked) setDisliked(false); // Ensuring dislike is set to false if liked
    }

    // Function to handle the dislike button click
    const handleDislike = () => {
        setDisliked(!disliked); // Toggling the disliked state
        if (liked) setLiked(false); // Ensuring like is set to false if disliked
    }

    // useEffect to fetch video data when the component mounts or the videoId changes
    useEffect(() => {
        const getSingleVideo = async () => {
            try {
                // Making a GET request to YouTube API to fetch video details
                const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`);
                setSingleVideo(res?.data?.items[0]); // Storing the video data in the state
            } catch (error) {
                console.log(error); 
            }
        }

        getSingleVideo();
    }, [videoId]); // Dependency array with videoId to trigger re-fetch when videoId changes

    return (
        // Main container with dark mode classes
        <div className='flex w-full mt-2 bg-white dark:bg-gray-800'>
            {/* Container for the video and its details */}
            <div className='flex flex-col w-3/4 p-4 bg-white dark:bg-gray-800'>
                <div>
                    {/* Iframe to embed the YouTube video */}
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${videoId}?&autoplay=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                    {/* Video title */}
                    <h1 className='font-bold mt-2 text-lg'>{singleVideo?.snippet?.title}</h1>
                    {/* Channel information and view count */}
                    <div className='flex items-center justify-between mt-2'>
                        <div className='flex items-center'>
                            <Avatar src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" size={35} round={true} />
                            <h1 className='font-bold ml-2'>{singleVideo?.snippet?.channelTitle}</h1>
                            <span className='ml-4 text-sm text-gray-600'>{singleVideo?.statistics?.viewCount} views</span>
                        </div>
                        <button className='px-4 py-1 font-medium bg-black text-white rounded-full'>Subscribe</button>
                    </div>
                    {/* Like, Dislike, Share, and Download buttons */}
                    <div className='flex items-center w-[40%] justify-between mt-2'>
                        <div onClick={handleLike} className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full'>
                            {liked ? <AiFillLike size="20px" className='mr-5' /> : <AiOutlineLike size="20px" className='mr-5' />}
                        </div>
                        <div onClick={handleDislike} className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full'>
                            {disliked ? <AiFillDislike size="20px" /> : <AiOutlineDislike size="20px" />}
                        </div>
                        <div className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full'>
                            <PiShareFatLight size="20px" className='mr-2' />
                            <span>Share</span>
                        </div>
                        <div className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full'>
                            <GoDownload />
                            <span>Download</span>
                        </div>
                    </div>
                    {/* Video description */}
                    <p className='mt-2 text-gray-600'>{singleVideo?.snippet?.description}</p>
                </div>
            </div>
            {/* Chat container */}
            <div className='flex flex-col w-1/4 border border-gray-300 rounded-lg h-fit p-4'>
                <div className='flex justify-between items-center'>
                    <h1>Top Chat</h1>
                    <BsThreeDotsVertical />
                </div>
                <div className='overflow-y-auto h-[28rem] flex flex-col-reverse'>
                    <LiveChat />
                </div>
                {/* Chat input and send button */}
                <div className='flex items-center justify-between border-t p-2'>
                    <div className='flex items-center w-[90%]'>
                        <div>
                            <Avatar src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" size={35} round={true} />
                        </div>
                        <input value={input} onChange={(e) => setInput(e.target.value)} className='border-b border-gray-300 outline-none ml-2' type="text" placeholder='Send message...' />
                        <div className='bg-gray-200 cursor-pointer p-2 rounded-full'>
                            <LuSendHorizonal onClick={sendMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watch;




