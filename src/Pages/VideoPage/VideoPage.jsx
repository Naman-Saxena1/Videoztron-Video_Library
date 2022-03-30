import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation, useParams } from "react-router-dom"
import { 
    AiOutlineLike,
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
    RecommendationCard
} from '../../index'

function VideoPage() {

    const { trendingVideosList } = useTrendingVideos()

    window.YTConfig = {
      host: 'https://www.youtube.com' 
    } 

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
                        <div className='video-options'>
                            <AiOutlineLike className='options-icon'/>
                            <span>Like</span>
                        </div>
                        <div className='video-options'>
                            <AiOutlineDislike className='options-icon'/>
                            <span>Dislike</span>
                        </div>
                        <div className='video-options'>
                            <MdAccessTime className='options-icon'/>
                            <span>Add to watch later</span>
                        </div>
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
                        trendingVideosList.map(recommendationVideo=>
                            <RecommendationCard video={recommendationVideo}/>
                        )
                    )
                }
            </div>
        </div>
    )
}

export { VideoPage };