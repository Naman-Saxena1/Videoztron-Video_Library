import React,{ useEffect } from 'react'
import Lottie from 'react-lottie'
import { useLocation } from "react-router-dom"
import './History.css'
import {
  Sidebar,
  VideoCard,
  useToast,
  useHistory
} from '../../index'
import sherlockLottie from "../../Assets/lottie/sherlock2.json"

function History() {

  const { showToast } = useToast()
  const { userHistoryList, setUserHistoryList } = useHistory()
  const { pathname } = useLocation();
  const numberOfVideosInHistory = userHistoryList.length;

  const sherlockObj = {
    loop: true,
    autoplay: true,
    animationData : sherlockLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className={`history-page-container ${numberOfVideosInHistory===0? "dark-theme": "light-theme"}`}>
        <h2 className='history-page-heading'>Your Browsing History {numberOfVideosInHistory===0?"is empty":""}</h2>
        {
          numberOfVideosInHistory===0
          ? (
            <Lottie options={sherlockObj}
              height={470}
              style={{position:"relative",bottom:"3rem", backgroundColor: "#0b5c72", width: "65%"}}
              isStopped={false}
              isPaused={false}
              onClick={()=>{}}
            />
          )
          : (
              <div className='watch-later-video-container'>
                {
                  userHistoryList.map((video)=>
                  <VideoCard key={video._id} video={video} itemInUserHistory={"true"}/>)
                }
              </div>
            )
        }
      </div>
    </div>
  )
}

export { History };