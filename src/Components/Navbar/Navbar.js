import React, { useEffect } from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"
import jwt_decode from "jwt-decode";
import { 
    useUserLogin, 
    useToast,
    useWatchLater,
    useLikedVideos,
    usePlaylist,
    useHistory 
} from "../../index"
import { AiOutlineBell } from "react-icons/ai"

function Navbar() {

    const { dispatchWatchLaterList } = useWatchLater()
    const { dispatchLikedVideosList } = useLikedVideos()
    const { allPlaylists, setAllPlaylists } = usePlaylist()
    const { setUserHistoryList } = useHistory()

    const { setUserLoggedIn } = useUserLogin(false)
    const { showToast } = useToast()

    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token)
        {
            const user = jwt_decode(token)
            
            if(!user)
            {
                localStorage.removeItem('token')
                setUserLoggedIn(false)
            }
            else
            {
                setUserLoggedIn(true)
            }
        }
    },[])

    function logoutUser()
    {
        localStorage.removeItem('token')
        setUserLoggedIn(false)
        localStorage.clear()
        dispatchLikedVideosList({type: "UPDATE_LIKED_VIDEOS_LIST",payload: []})
        dispatchWatchLaterList({type: "UPDATE_WATCH_LATER_LIST",payload: []})
        setAllPlaylists([])
        setUserHistoryList([])
        showToast("success","","Logged out successfully")
    }
    
    return (
        <div className="top-bar">
            <div className="left-topbar-container">
                <Link to="/">
                    <h2 className="top-bar-brand-name">Videoztron</h2>
                </Link>
                <div className="search-bar">
                    <input className="search-bar-input" placeholder="Search"/>
                    <button id="search-bar-btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div className="right-topbar-container">
                {
                    localStorage.getItem('token')!==null
                    ? (
                        <button onClick={logoutUser} className="navbar-login-btn solid-primary-btn">Logout</button>
                    )
                    : (
                        <Link to="/login">
                            <button className="navbar-login-btn solid-primary-btn">Login</button>
                        </Link>
                    )
                }
                <Link to="/">
                    <button className="icon-btn">
                        <div>
                            <AiOutlineBell/>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export {Navbar};