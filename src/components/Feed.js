import React from 'react'
import ButtonList from './ButtonList'
import VideoPlayer from '../pages/VideoPlayer'

const Feed = () => {
  return (
    <div className='ml-5 mr-5 w-[80%]'> 
      <ButtonList/>
      <VideoPlayer/>
    </div>
  )
}

export default Feed