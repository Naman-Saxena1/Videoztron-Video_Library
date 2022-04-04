import "./PlaylistCard.css"
import {
    BiTrashAlt
} from "react-icons/bi"
import axios from "axios"
import {
    useToast,
    usePlaylist
} from "../../index"
import { Link } from "react-router-dom"

function PlaylistCard({playlist})
{
    const { showToast } = useToast()
    const { setAllPlaylists } = usePlaylist()

    const deleteThisPlaylist = async () => {
        const updatedUserInfo = await axios.delete(
            `https://videoztron.herokuapp.com/api/playlist/delete/${playlist._id}`,
            {
              headers: {'x-access-token':localStorage.getItem('token')}
            }
          )
      
          if(updatedUserInfo.data.status==="ok")
          {
            setAllPlaylists(updatedUserInfo.data.user.allPlaylists)
            showToast("success","","Successfully deleted playlist!")
          }
    }

    return (
        <Link to={`/playlist/${playlist._id}`} state={{playlistId:playlist._id, playListName: playlist.playListName}}>
            <div className="playlist-card">
                <div className="playlist-details">
                    <h4>{playlist.playListName}</h4>
                    <h4>{playlist.videosInPlaylist.length} videos</h4>
                </div>
                <button 
                    className="icon-btn trash-button"
                    onClick={(event)=>{
                        event.preventDefault()
                        event.stopPropagation()
                        deleteThisPlaylist()
                    }}
                >
                    <div>
                        <BiTrashAlt/>
                    </div>
                </button>
            </div>
        </Link>
    )
}

export { PlaylistCard }