import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import './LikedVideos.css'
import {
  Sidebar,
  useLikedVideos,
  VideoCard
} from '../../index'
import Lottie from "react-lottie"
import AstronautLottie from "../../Assets/lottie/astronaut.json"

function LikedVideos() {

  const { likedVideosList, dispatchLikedVideosList } = useLikedVideos()
  const { pathname } = useLocation();
  const numberOfVideosLiked = likedVideosList.length;

  const astronautObj = {
      loop: true,
      autoplay: true,
      animationData : AstronautLottie,
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
            dispatchLikedVideosList({type: "UPDATE_LIKED_VIDEOS_LIST",payload: updatedUserInfo.data.user.likedVideos})
          }
        })()
      }
    }
  },[])

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className={`liked-videos-container ${numberOfVideosLiked===0? "dark-theme": "light-theme"}`}>
        <h2 className='liked-videos-heading'>
          {numberOfVideosLiked} {numberOfVideosLiked===1?"video is":"videos are"} in your Liked Videos list
        </h2>
        
          {
            numberOfVideosLiked===0
            ? (
              <Lottie options={astronautObj}
                height={450}
                width={450}
                style={{position:"relative",bottom:"3rem"}}
                isStopped={false}
                isPaused={false}
              />
            )
            : (
                <div className='liked-videos-list-container'>
                  {
                    likedVideosList.map((video)=>
                    <VideoCard key={video._id} video={video}/>)
                  }
                </div>
              )
          }
      </div>
    </div>
  )
}

export { LikedVideos };