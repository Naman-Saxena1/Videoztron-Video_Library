import React,{ useEffect } from 'react'
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Link, useLocation } from "react-router-dom"
import './Home.css'
import {
  Sidebar, 
  VideoCard, 
  Footer,
  useTrendingVideos
} from '../../index'
import sherlock from '../../assets/images/sherlock4.jpg'

function Home() {
  const { trendingVideosList } = useTrendingVideos()

  const { pathname } = useLocation();

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
              // (async function getUpdatedUserData()
              // {
              //     let updatedUserInfo = await axios.get(
              //     "http://localhost:1337/api/user",
              //     {
              //         headers:
              //         {
              //         'x-access-token': localStorage.getItem('token'),
              //         }
              //     })

              //     if(updatedUserInfo.data.status==="ok")
              //     {
              //         dispatchUserWishlist({type: "UPDATE_USER_WISHLIST",payload: updatedUserInfo.data.user.wishlist})
              //         dispatchUserCart({type: "UPDATE_USER_CART",payload: updatedUserInfo.data.user.cart})
              //     }
              // })()
          }
      }   
  },[])

  let covervideo = {
    "_id": "62430b3be22ce0735254b2a5",
    "videoSrcUrl": "https://www.youtube.com/watch?v=5z32qzSqtXY",
    "title": "Sherlock plays the violin for the Eurus (Sherlok 4: The final problem)",
    "owner": "Mystery Strings",
    "thumbnail": "https://img.youtube.com/vi/5z32qzSqtXY/0.jpg",
    "description": "",
    "views": 1582160,
    "noOfLikes": 29000,
    "noOfDislikes": 2410,
    "comments": [],
    "__v": 0,
    "category": "crime"
  }

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className='home-page-container'>
        
        <div className='home-page-cover-container'>
          <img className="home-page-cover-img" src={sherlock} alt="sherlock shot"></img>
          <div className='home-page-cover-description'>
            <h3>Best Detective show</h3>
            <p>Watch Sherlock Final Problem scene</p>
            <Link to={"/video/62430b3be22ce0735254b2a5"} state={{videoDetails:covervideo}}>
              <button className="solid-secondary-btn red-solid-btn">
                Watch Now
              </button>
            </Link>
          </div>
        </div>

        <h2 className='homepage-trending-heading'>Trending Videos</h2>
        <div className='videos-container'>
          {
            trendingVideosList.map((video,index)=>
                <VideoCard key={index} video={video}/>
            )
          }
        </div>

        <Link to="/explore">
          <button className="solid-secondary-btn red-solid-btn explore-btn">
                Explore all
          </button>
        </Link>

        <Footer/>

      </div>
    </div>
  )
}

export { Home };