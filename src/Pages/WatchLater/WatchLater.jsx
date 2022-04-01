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
import SadboxLottie from "../../Assets/lottie/sad-empty-box.json"

function WatchLater() {

  const { watchLaterList, dispatchWatchLaterList } = useWatchLater()
  const { pathname } = useLocation();

  let sadboxObj = {
      loop: true,
      autoplay: true,
      animationData : SadboxLottie,
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
              "https://videoztron.herokuapp.com/api/user",
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
      <div className='watch-later-container'>
        <h2 className='watch-later-heading'>
          {watchLaterList.length} {watchLaterList.length===1?"video is":"videos are"} in your Watch Later list
        </h2>
        
          {
            watchLaterList.length===0
            ? (
              <Lottie options={sadboxObj}
                height={450}
                width={450}
                style={{position:"relative",bottom:"8rem"}}
                isStopped={false}
                isPaused={false}
              />
            )
            : (
                <div className='watch-later-video-container'>
                  {
                    watchLaterList.map((video,index)=>
                    <VideoCard key={index} video={video}/>)
                  }
                </div>
              )
          }
      </div>
    </div>
  )
}

export { WatchLater };