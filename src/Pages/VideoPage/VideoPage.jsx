import React,{ useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import { 
    AiFillLike,
    AiOutlineLike,
    AiFillDislike,
    AiOutlineDislike 
} from "react-icons/ai"
import {
    MdAccessTime,
    MdPlaylistAdd
} from "react-icons/md"
import YouTube from "react-youtube";
import './VideoPage.css'
import {
    useTrendingVideos,
    RecommendationCard,
    useLikedVideos,
    useDislikedVideos,
    useWatchLater,
    useToast
} from '../../index'

function VideoPage() {

    const { dislikedVideosList, dispatchDislikedVideosList } = useDislikedVideos()
    const { likedVideosList, dispatchLikedVideosList } = useLikedVideos()
    const { watchLaterList, dispatchWatchLaterList } = useWatchLater()
    const { showToast } = useToast()
    const [ videoLikedStatus, setVideoLikedStatus ] = useState("neutral")
    const [ isVideoPresentInWatchLater, setIsVideoPresentInWatchLater ] = useState(false)

    const { trendingVideosList } = useTrendingVideos()

    window.YTConfig = {
      host: 'https://www.youtube.com' 
    } 

    const navigate = useNavigate()
    const { pathname, state } = useLocation();

    let video = state.videoDetails
    const {
        videoSrcUrl,
        title,
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

    let videoCode;
    if (videoSrcUrl) {
        videoCode = videoSrcUrl.split("v=")[1].split("&")[0];
    }

    const opts = {
        playerVars: {
        autoplay: 1
        }
    };
    
    useEffect(()=>{
        const watchLaterIndex = watchLaterList.findIndex(videoDetails=> {
            return videoDetails._id === video._id
        })

        if(watchLaterIndex!==-1)
        {
            setIsVideoPresentInWatchLater(true)
        }
        else
        {
            setIsVideoPresentInWatchLater(false)
        }

        const likedVideoIndex = likedVideosList.findIndex(videoDetails=> {
            return videoDetails._id === video._id
        })

        if(likedVideoIndex!==-1)
        {
            setVideoLikedStatus("liked")
        }
        else
        {
            const dislikedVideoIndex = dislikedVideosList.findIndex(videoDetails=> {
                return videoDetails._id === video._id
            })

            if(dislikedVideoIndex!==-1)
            {
                setVideoLikedStatus("disliked")
            }
            else
            {
                setVideoLikedStatus("neutral")
            }
        }
    },[likedVideosList, video._id, watchLaterList])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const addToLikedVideos = async () => {
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
                if(videoLikedStatus==="liked")
                {
                    // Item already present in liked videos list, remove like
                    let updatedUserInfo = await axios.delete(
                        `https://videoztron.herokuapp.com/api/likedvideos/${video._id}`,
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
                        dispatchLikedVideosList({type: "UPDATE_LIKED_VIDEOS_LIST",payload: updatedUserInfo.data.user.likedVideos})
                        setVideoLikedStatus("neutral")
                        showToast("success","","Video Like removed")
                    }
                }
                else
                {
                    // Item not present in liked videos
                    // Update in backend and then in frontend
                    let updatedUserInfo = await axios.patch(
                        "https://videoztron.herokuapp.com/api/likedvideos",
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

                    //Remove from liked videos list, if it exists in it
                    const dislikedVideoIndex = dislikedVideosList.findIndex(videoDetails=> {
                        return videoDetails._id === video._id
                    })
            
                    if(dislikedVideoIndex!==-1)
                    {
                        updatedUserInfo = await axios.delete(
                            `https://videoztron.herokuapp.com/api/dislikedvideos/${video._id}`,
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
                    }

                    if(updatedUserInfo.data.status==="ok")
                    {
                        dispatchLikedVideosList({type: "UPDATE_LIKED_VIDEOS_LIST",payload: updatedUserInfo.data.user.likedVideos})
                        dispatchDislikedVideosList({type: "UPDATE_DISLIKED_VIDEOS_LIST",payload: updatedUserInfo.data.user.dislikedVideos})
                        setVideoLikedStatus("liked")
                        showToast("success","","Video liked")
                    }
                }
            }
        }
        else
        {
            showToast("warning","","Kindly Login")
        }
    }

    const removeFromLikedVideos = async () => {
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
                if(videoLikedStatus==="disliked")
                {
                    let updatedUserInfo = await axios.delete(
                        `https://videoztron.herokuapp.com/api/dislikedvideos/${video._id}`,
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
                        dispatchDislikedVideosList({type: "UPDATE_DISLIKED_VIDEOS_LIST",payload: updatedUserInfo.data.user.dislikedVideos})
                    }
                    setVideoLikedStatus("neutral")
                    showToast("success","","Video Dislike removed")
                }
                else
                {
                
                    //Add to disliked videos list
                    let updatedUserInfo = await axios.patch(
                        "https://videoztron.herokuapp.com/api/dislikedvideos",
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

                    //Remove from liked videos list, if it exists in it
                    const likedVideoIndex = likedVideosList.findIndex(videoDetails=> {
                        return videoDetails._id === video._id
                    })
            
                    if(likedVideoIndex!==-1)
                    {
                        updatedUserInfo = await axios.delete(
                            `https://videoztron.herokuapp.com/api/likedvideos/${video._id}`,
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
                    }
                        
                    if(updatedUserInfo.data.status==="ok")
                    {
                        dispatchLikedVideosList({type: "UPDATE_LIKED_VIDEOS_LIST",payload: updatedUserInfo.data.user.likedVideos})
                        dispatchDislikedVideosList({type: "UPDATE_DISLIKED_VIDEOS_LIST",payload: updatedUserInfo.data.user.dislikedVideos})
                        setVideoLikedStatus("disliked")
                        showToast("success","","Video disliked")
                    }
                }   
            }
        }
        else
        {
            showToast("warning","","Kindly Login")
        }
    }

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

    return (
        <div className='video-page-container'>
            <div className='video-content-container'>
                <div className='youtube-video-container'>
                    <YouTube
                        videoId={videoCode}
                        containerClassName="embed embed-youtube"
                        className="youtube-video"
                        opts={opts}
                    />
                </div>
                <h3 className='video-title'>{title}</h3>
                <div className='video-info-and-options'>
                    <div className='video-info'>
                        <span>{videoViews} &#183; 13 hours ago</span>
                    </div>
                    <div className='video-options-container'>
                        {
                            videoLikedStatus==="liked" 
                            ? (
                                <div 
                                    className='video-options'
                                    onClick={()=>addToLikedVideos()}
                                >
                                    <AiFillLike className='options-icon'/>
                                    <span>Like</span>
                                </div>
                            ) : (
                                <div 
                                    className='video-options'
                                    onClick={()=>addToLikedVideos()}
                                >
                                    <AiOutlineLike className='options-icon'/>
                                    <span>Like</span>
                                </div>
                            )
                        }
                        {
                            videoLikedStatus==="disliked"
                            ? (
                                <div 
                                    className='video-options'
                                    onClick={()=>removeFromLikedVideos()}
                                >
                                    <AiFillDislike className='options-icon'/>
                                    <span>Dislike</span>
                                </div>
                            ) : (
                                <div 
                                    className='video-options'
                                    onClick={()=>removeFromLikedVideos()}
                                >
                                    <AiOutlineDislike className='options-icon'/>
                                    <span>Dislike</span>
                                </div>
                            )
                        }
                        {
                            isVideoPresentInWatchLater
                            ? (
                                <div 
                                    className='video-options'
                                    onClick={()=>{
                                        removeItemFromWatchLaterList()
                                    }}
                                >
                                    <MdAccessTime className='options-icon'/>
                                    <span>Remove from watch later</span>
                                </div>

                            ) : (
                                <div 
                                    className='video-options'
                                    onClick={()=>{
                                        addItemToWatchLaterList()
                                    }}
                                >
                                    <MdAccessTime className='options-icon'/>
                                    <span>Add to watch later</span>
                                </div>
                            )
                        }
                        <div className='video-options'>
                            <MdPlaylistAdd className='options-icon'/>
                            <span>Add to playlist</span>
                        </div>
                    </div>
                </div>

                <hr></hr>

                <h4>Comments</h4>
            </div>
            <div className='video-recommendation-container'>
                {
                    JSON.stringify(trendingVideosList)!==JSON.stringify([]) && 
                    (
                        trendingVideosList.map((recommendationVideo,index)=>
                            <RecommendationCard key={index} video={recommendationVideo}/>
                        )
                    )
                }
            </div>
        </div>
    )
}

export { VideoPage };