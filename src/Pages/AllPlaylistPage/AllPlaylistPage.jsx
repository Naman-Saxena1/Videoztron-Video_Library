import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import './AllPlaylistPage.css'
import {
  Sidebar,
  usePlaylist,
  PlaylistCard,
  useToast
} from '../../index'
import Lottie from "react-lottie"
import ManInPark from "../../Assets/lottie/man-in-the-park.json"

function AllPlaylistPage() {

  const { allPlaylists, setAllPlaylists } = usePlaylist()
  const { showToast } = useToast()

  let numberOfPlaylists = allPlaylists.length;

  const manInParkObj = {
      loop: true,
      autoplay: true,
      animationData : ManInPark,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
  }

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {

    let token = localStorage.getItem("token")

    if(token)
    {
      let user = jwt_decode(token)

      if(user)
      {
        (async() => {
          let updatedUserInfo = await axios.get(
            "https://videoztron.herokuapp.com/api/user",
            {
              headers : {'x-access-token':localStorage.getItem("token")}
            }
          )

          if(updatedUserInfo.data.status==="ok")
          {
            setAllPlaylists(updatedUserInfo.data.user.allPlaylists)
          }
        })()
      }
    }
  },[])

  const deleteAllPlaylists = async () => {
    const updatedUserInfo = await axios.delete(
      "https://videoztron.herokuapp.com/api/playlist/deleteall",
      {
        headers: {'x-access-token':localStorage.getItem('token')}
      }
    )

    if(updatedUserInfo.data.status==="ok")
    {
      setAllPlaylists([])
      showToast("success","","All Playlists deleted!")
    }
  }

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className={`playlist-container ${numberOfPlaylists===0? "dark-theme": "light-theme"}`}>
        <h2 className='playlist-heading'>
          {numberOfPlaylists} {numberOfPlaylists===1?"playlist is":"playlists are"} present
        </h2>
          {
            numberOfPlaylists!==0 &&
            (
              <button 
                className="solid-secondary-btn red-solid-btn delete-all-playlists-btn"
                onClick={deleteAllPlaylists}
              >
                Delete all playlists
              </button>
            )
          }
          {
            numberOfPlaylists===0
            ? (
              <Lottie options={manInParkObj}
                height={570}
                style={{position:"absolute", margin: "auto", width: "60%"}}
                isStopped={false}
                isPaused={false}
              />
            )
            : (
                <div className='playlist-video-container'>
                  {
                    allPlaylists.map((playlist)=>
                      <PlaylistCard key={playlist._id} playlist={playlist}/>
                    )               
                  }
                </div>
              )
          }
      </div>
    </div>
  )
}

export { AllPlaylistPage };