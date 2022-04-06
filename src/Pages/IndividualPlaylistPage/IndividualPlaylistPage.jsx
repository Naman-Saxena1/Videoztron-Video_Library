import './IndividualPlaylistPage.css'
import {
    Sidebar,
    VideoCard,
    usePlaylist
} from "../../index"
import { useLocation } from "react-router-dom"
import { useEffect } from 'react'

function IndividualPlaylistPage()
{
    const { state } = useLocation()
    const { allPlaylists } = usePlaylist()
    const {
      playlistId,
      playListName 
    } = state

    return (
        <div className='page-container'>
        <Sidebar/>
        <div className="individual-playlist-container">
          <h2 className='individual-playlist-heading'>
            Playlist - {playListName}
          </h2>  
            {
                <div className='individual-playlist-video-container'>
                {
                    allPlaylists.length!==0 &&
                    allPlaylists.find(playlist=>playlist._id===playlistId)
                    .videosInPlaylist.map((video)=>
                    <VideoCard key={video._id} video={video} isPlayListCard={true} playlistId={playlistId}/>)
                }
                </div>
            }
        </div>
      </div>
    )
}

export { IndividualPlaylistPage }