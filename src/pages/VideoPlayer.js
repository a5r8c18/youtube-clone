import React, { useEffect } from 'react';
import axios from "axios";
import API_KEY, { YOUTUBE_VIDEO_API } from '../constant/youtube';
import VideoCart from '../components/VideoCart';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideo } from '../utils/appSlice';

const VideoPlayer = () => {
    const { video, category } = useSelector((store) => store.app); // Selecting video and category state from the Redux store
    console.log(category);
    const dispatch = useDispatch(); // Getting the dispatch function from Redux

    // useEffect to fetch videos whenever the category changes
    useEffect(() => {
        // Function to fetch YouTube videos without any specific category
        const fetchingYoutubeVideo = async () => {
            try {
                const res = await axios.get(`${YOUTUBE_VIDEO_API}`); // Making an API request to fetch YouTube videos
                dispatch(setHomeVideo(res?.data?.items)) // Dispatching the setHomeVideo action to store the fetched videos in Redux
            } catch (error) {
                console.log(error); // Logging any errors that occur during the API request
            }
        }

        // Function to fetch YouTube videos by a specific category
        const fetchVideoByCategory = async (category) => {
            try {
                const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=${API_KEY}`); // Making an API request to fetch YouTube videos by category
                dispatch(setHomeVideo(res?.data?.items)) // Dispatching the setHomeVideo action to store the fetched videos in Redux
            } catch (error) {
                console.log(error); // Logging any errors that occur during the API request
            }
        }

        if (category === "All") {
            fetchingYoutubeVideo(); // Fetching all videos if the category is "All"
        } else {
            fetchVideoByCategory(category); // Fetching videos by category if a specific category is selected
        }
    }, [category, dispatch]); // Dependency array with category to trigger re-fetch when category changes

    return (
        <div className='grid grid-cols-3 gap-3 dark:bg-gray-900 dark:text-white'> {/* Grid container for video thumbnails */}
            {
                video.map((item) => {
                    console.log(item);
                    return (
                        // Creating links to the video watch page for each video
                        <Link to={`/watch?v=${typeof item.id === 'object' ? item.id.videoId : item.id }`} key={typeof item.id === 'object' ? item.id.videoId : item.id } >
                            <VideoCart item={item} /> {/* Rendering the VideoCart component for each video */}
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default VideoPlayer;

