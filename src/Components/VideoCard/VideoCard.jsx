import './VideoCard.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"
import sherlock from "../../Assets/images/sherlock1.webp"
import {
    AiOutlineMore
} from "react-icons/ai"
import {
    BiTrashAlt
} from "react-icons/bi"
import {
    MdAccessTime,
    MdPlaylistAdd,
    MdHistory
} from "react-icons/md"
import {
    AddToPlaylistModal,
    useWatchLater,
    useToast, 
    useHistory,
    usePlaylist
} from '../../index'
import axios from 'axios'

function VideoCard({ video, itemInUserHistory, isPlayListCard, playlistId })
{
    const navigate = useNavigate()

    const { watchLaterList, dispatchWatchLaterList } = useWatchLater()
    const { showToast } = useToast()
    const { userHistoryList, setUserHistoryList } = useHistory()
    const { allPlaylists, setAllPlaylists } = usePlaylist()

    const [ showVideoOptions, setShowVideoOptions ] = useState(false)
    const [ isVideoPresentInWatchLater, setIsVideoPresentInWatchLater ] = useState(false)
    const [ showPlaylistModal, setShowPlaylistModal ] = useState(false)

    const {
        _id,
        title,
        thumbnail,
        views
    } = video

    let videoViews;

    if(views>1000000)
    {
        videoViews = (views/1000000).toFixed(1) + "M"
    }
    else
    {
        if(views>1000)
        {
            videoViews = (views/1000).toFixed(1) + "K"
        }
        else
        {
            videoViews = views + ""
        }
    }
    
    useEffect(()=>{
        const index = watchLaterList.findIndex(videoDetails=> {
            return videoDetails._id === video._id
        })

        if(index!==-1)
        {
            setIsVideoPresentInWatchLater(true)
        }
        else
        {
            setIsVideoPresentInWatchLater(false)
        }
    },[watchLaterList])

    const addItemToWatchLaterList = async () => {
        const token=localStorage.getItem('token')

        if(token)
        {
            const user = jwt_decode(token)
                
            if(!user)
            {
                localStorage.removeItem('token')
                showToast("warning","","Kindly Login")
                navigate('/login')
            }
            else
            {
                if(isVideoPresentInWatchLater)
                {
                    // Item already present in watch later list
                    showToast("success","","Video already present in Watch Later")
                }
                else
                {
                    // Item not present in Watch Later
                    // Update in backend and then in frontend
                    let updatedUserInfo = await axios.patch(
                        "https://videoztron.herokuapp.com/api/watchlater",
                        {
                            video
                        },
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
                        setIsVideoPresentInWatchLater(true)
                        showToast("success","","Video successfully added to watch later")
                    }
                }
            }
        }
        else
        {
            showToast("warning","","Kindly Login")
        }
    }

    const removeItemFromWatchLaterList = async () => {
        const token=localStorage.getItem('token')

        if(token)
        {
            const user = jwt_decode(token)
                
            if(!user)
            {
                localStorage.removeItem('token')
                showToast("warning","","Kindly Login")
                navigate('/login')
            }
            else
            {
                // Item already present in watch later list, remove it
                let updatedUserInfo = await axios.delete(
                    `https://videoztron.herokuapp.com/api/watchlater/${video._id}`,
                    {
                        headers:
                        {
                            'x-access-token': localStorage.getItem('token'),
                        }
                    },
                    {
                        video
                    }
                )
                    
                if(updatedUserInfo.data.status==="ok")
                {
                    dispatchWatchLaterList({type: "UPDATE_WATCH_LATER_LIST",payload: updatedUserInfo.data.user.watchLater})
                    setIsVideoPresentInWatchLater(false)
                    showToast("success","","Video successfully removed to watch later")
                }
            }
        }
        else
        {
            showToast("warning","","Kindly Login")
        }
    }

    const removeVideoFromHistory = async () => {
        
        const updatedUserInfo = await axios.delete(
            `https://videoztron.herokuapp.com/api/history/${video._id}`,
            {
                headers : {'x-access-token': localStorage.getItem('token')} 
            }
        )

        if(updatedUserInfo.data.status==="ok")
        {
            setUserHistoryList(updatedUserInfo.data.user.history)
        }
    }

    const addToUserPlaylist = async () => {
        const token=localStorage.getItem('token')

        if(token)
        {
            const user = jwt_decode(token)
                
            if(!user)
            {
                localStorage.removeItem('token')
                showToast("warning","","Kindly Login")
                navigate('/login')
            }
            else
            {
                setShowPlaylistModal(true)
            }
        }
        else
        {
            showToast("warning","","Kindly Login")
        }
    }

    const removeVideoFromPlaylist = async () => {
        
        const updatedUserInfo = await axios.delete(
            `https://videoztron.herokuapp.com/api/playlist/delete/specificvideo`,
            {
                headers: {'x-access-token':localStorage.getItem("token")},
                data: {playlistId: playlistId, videoId : _id}
            }
        )

        if(updatedUserInfo.data.status==="ok")
        {
            setAllPlaylists(updatedUserInfo.data.user.allPlaylists)
            showToast("success","","Video removed from playlist!")
        }
    } 

    return (
        <Link to={`/video/${_id}`} state={{videoDetails:video}}>
            <div className='video-card'>
                <img className="video-card-thumbnail-img" src={thumbnail} alt={`video-alternate-text`}></img>
                <h3 className="video-card-title">{title}</h3>
                <h5>{videoViews} views | 9 hours ago</h5>
                <div className="card-button">
                    {
                        isPlayListCard===true 
                        ? (
                            <button 
                                className="videocard-options-btn outline-card-secondary-btn"
                                onClick={event=>{
                                    event.preventDefault()
                                    event.stopPropagation()
                                    removeVideoFromPlaylist()
                                }}
                            >    
                                <BiTrashAlt style={{fontSize: "20px"}}/>
                            </button>
                        ) : (
                            <button 
                                className="videocard-options-btn outline-card-secondary-btn"
                                onClick={event=>{
                                    event.preventDefault()
                                    event.stopPropagation()
                                    setShowVideoOptions(prevState=> !prevState)
                                }}
                            >    
                                <AiOutlineMore style={{fontSize: "20px"}}/>
                            </button>
                        )
                    }
                </div>
                {
                    showVideoOptions && (
                        <div className='videocard-options-container'>
                            {
                                isVideoPresentInWatchLater
                                ? (
                                    <div 
                                        className='videocard-options'
                                        onClick={(event)=>{
                                            event.preventDefault()
                                            event.stopPropagation()
                                            removeItemFromWatchLaterList()
                                            setShowVideoOptions(false)
                                        }}
                                    >
                                        <MdAccessTime style={{fontSize: "20px"}}/>
                                        <h5>Remove from watch later</h5>
                                    </div>
                                ): (
                                    <div 
                                        className='videocard-options'
                                        onClick={(event)=>{
                                            event.preventDefault()
                                            event.stopPropagation()
                                            addItemToWatchLaterList()
                                            setShowVideoOptions(false)
                                        }}
                                    >
                                        <MdAccessTime style={{fontSize: "20px"}}/>
                                        <h5>Add to watch later</h5>
                                    </div>
                                )
                            }
                            
                            <div className='videocard-options'
                                onClick={(event)=>{
                                    event.preventDefault()
                                    event.stopPropagation()
                                    addToUserPlaylist()
                                    setShowVideoOptions(false)
                                }}
                            >
                                <MdPlaylistAdd style={{fontSize: "20px"}}/>
                                <h5>Add to your playlist</h5>
                            </div>
                            {
                                itemInUserHistory && 
                                (
                                    <div className='videocard-options'
                                        onClick={(event)=>{
                                            event.preventDefault()
                                            event.stopPropagation()
                                            removeVideoFromHistory()
                                            setShowVideoOptions(false)
                                        }}
                                    >
                                        <MdHistory style={{fontSize: "20px"}}/>
                                        <h5>Remove from history</h5>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                <AddToPlaylistModal 
                    showPlaylistModal={showPlaylistModal} 
                    setShowPlaylistModal={setShowPlaylistModal}
                    video={video}
                    onClick={(event)=>{
                        event.preventDefault()
                        event.stopPropagation()
                    }}
                />            
            </div>
        </Link>
    )
}

export { VideoCard }