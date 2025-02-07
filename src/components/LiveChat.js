import React, { useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from '../utils/chatSlice';
import { generateRandomName, generateRandomMessage } from '../utils/helper';


const LiveChat = () => {
    const messages = useSelector((store) => store.chat.message);
    const dispatch = useDispatch();
    

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(setMessage({ name: generateRandomName(), message: generateRandomMessage(16) }));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [dispatch]);


    return (
        <div className='px-4 py-1'>
            <div>
                {messages.map((item, idx) => (
                    <ChatMessage key={idx} item={item} />
                ))}
            </div>
            
        </div>
    );
};

export default LiveChat;
