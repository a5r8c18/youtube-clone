import React, { useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from '../utils/chatSlice';
import { generateRandomName, generateRandomMessage } from '../utils/helper';


const LiveChat = () => {
    const messages = useSelector((store) => store.chat.message); // Select the list of messages from the Redux store
    const dispatch = useDispatch(); // Get the dispatch function to dispatch actions

    // useEffect hook to set up a timer that dispatches a new message every second
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(setMessage({ name: generateRandomName(), message: generateRandomMessage(16) })); // Dispatch a new random message every second
        }, 1000);

        return () => {
            clearInterval(timer); // Clean up the timer when the component unmounts
        };
    }, [dispatch]); // Only run this effect once, when the component mounts

    return (
        <div className='px-4 py-1'>
            <div>
                {messages.map((item, idx) => (
                    <ChatMessage key={idx} item={item} /> // Render each message using the ChatMessage component
                ))}
            </div>
        </div>
    );
};

export default LiveChat;
