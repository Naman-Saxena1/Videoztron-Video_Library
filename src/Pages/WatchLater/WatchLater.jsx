import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import './WatchLater.css'
import {
  Sidebar,
  useWatchLater,
  VideoCard
} from '../../index'
import Lottie from "react-lottie"
import SpaceshipLottie from "../../Assets/lottie/spaceship.json"

function WatchLater() {

  const { watchLaterList, dispatchWatchLaterList } = useWatchLater()
  const { pathname } = useLocation();
  const numberOfVideosInWatchLaterList = watchLaterList.length;

  const spacshipObj = {
      loop: true,
      autoplay: true,
      animationData : SpaceshipLottie,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(()=>{

    const token=localStorage.getItem('token')

    if(token)
    {
      const user = jwt_decode(token)
      if(!user)
      {
        localStorage.removeItem('token')
      }
      else
      {
        (async () => {
        
          let updatedUserInfo = await axios.get(
              "https://videoztron-server.vercel.app/api/user",
              {
                headers:
                {
                  'x-access-token': localStorage.getItem('token'),
                }
              }
          )

          if(updatedUserInfo.data.status==="ok")
          {
            dispatchWatchLaterList({type: "UPDATE_WATCH_LATER_LIST",payload: updatedUserInfo.data.user.watchLater})
          }  
        })()
      }
    }
  },[])

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className={`watch-later-container ${numberOfVideosInWatchLaterList===0? "dark-theme": "light-theme"}`}>
        <h2 className='watch-later-heading'>
          {numberOfVideosInWatchLaterList} {numberOfVideosInWatchLaterList===1?"video is":"videos are"} in your Watch Later list
        </h2>
        
          {
            numberOfVideosInWatchLaterList===0
            ? (
              <Lottie options={spacshipObj}
                height={570}
                style={{position:"absolute", margin: "auto", width: "60%"}}
                isStopped={false}
                isPaused={false}
              />
            )
            : (
                <div className='watch-later-video-container'>
                  {
                    watchLaterList.map((video)=>
                    <VideoCard key={video._id} video={video}/>)
                  }
                </div>
              )
          }
      </div>
    </div>
  )
}

export { WatchLater };