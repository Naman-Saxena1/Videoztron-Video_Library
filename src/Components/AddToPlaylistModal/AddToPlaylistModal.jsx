import { useState, useEffect } from "react"
import './AddToPlaylistModal.css'
import {
    GrClose
} from 'react-icons/gr'
import {
    AiOutlinePlus
} from 'react-icons/ai'
import {
    usePlaylist,
    useToast
} from '../../index'
import axios from "axios"

function AddToPlaylistModal({video, showPlaylistModal, setShowPlaylistModal})
{

    const { allPlaylists, setAllPlaylists }                   = usePlaylist()
    const { showToast }                                       = useToast()

    const [ playlistCheckboxState, setPlaylistCheckboxState ] = useState([])
    const [ addToNewPlaylist, setAddToNewPlaylist ]           = useState(false)
    const [ newPlaylistName, setNewPlaylistName ]             = useState("")

    const addVideoToNewPlaylist = async () => {
        const updatedUserInfo = await axios.post(
            'https://videoztron.herokuapp.com/api/playlist/newplaylist',
            {
                video,
                newPlaylistName
            },
            {
                headers: {'x-access-token':localStorage.getItem('token')}
            }
        )

        if(updatedUserInfo.data.status==="ok")
        {
            setAllPlaylists(updatedUserInfo.data.user.allPlaylists)
            setNewPlaylistName("")
            setShowPlaylistModal(false)
            showToast("success","","Video successfully added to playlist!")
        }
    }

    const addVideoToThisExistingPlaylist = async (event, playlistId) => {
        const updatedUserInfo = await axios.patch(
            "https://videoztron.herokuapp.com/api/playlist",
            {
                playlistId,
                video
            },
            {
                headers: {'x-access-token':localStorage.getItem('token')}
            }
        )

        if(updatedUserInfo.data.status==="ok")
        {
            setAllPlaylists(updatedUserInfo.data.user.allPlaylists)
            setShowPlaylistModal(false)
            showToast("success","","Video successfully added to playlist!")
        }
    }

    return (
        <>
        {
            showPlaylistModal && (
                <div 
                    className="playlist-modal-container"
                    onClick={(event)=>{
                        event.preventDefault()
                        event.stopPropagation()
                    }}
                >
                    <div 
                        className="playlist-modal"
                        onClick={(event)=>{
                            event.preventDefault()
                            event.stopPropagation()
                        }}
                    >
                        <div 
                            className="playlist-modal-header-container"
                            onClick={(event)=>{
                                event.preventDefault()
                                event.stopPropagation()
                            }}
                        >
                            <h4>Save to . . .</h4>
                            <GrClose 
                                className="add-to-playlist-close-modal-btn" 
                                style={{width:'20px', height:'20px'}}
                                onClick={(event)=>{
                                    event.preventDefault()
                                    event.stopPropagation()
                                    setShowPlaylistModal(prevState=> !prevState)
                                    setAddToNewPlaylist(false)
                                }}
                            />
                        </div>
                        <hr></hr>

                        {
                            allPlaylists.length!==0 && (
                                <>
                                    <div 
                                        className="current-playlist-options-container"
                                        onClick={(event)=>{
                                            event.preventDefault()
                                            event.stopPropagation()
                                        }}
                                    >
                                        {
                                            allPlaylists.map((playlist,index)=>{

                                                return  (
                                                    <div 
                                                        key={playlist._id} 
                                                        className="current-playlist-options"
                                                        onClick={(event)=>addVideoToThisExistingPlaylist(event, playlist._id)}
                                                    >
                                                        <p>{playlist.playListName}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <hr></hr>
                                </>
                            )
                        }
                        {
                            addToNewPlaylist ?
                            (
                                <div className="new-playlist">
                                    <label htmlFor="new-playlist-name">Name</label>
                                    <input 
                                        id='new-playlist-name'
                                        value={newPlaylistName}
                                        onChange={(event)=>
                                            {
                                                event.preventDefault()
                                                event.stopPropagation()
                                                setNewPlaylistName(event.target.value)
                                            }
                                        }
                                    ></input>
                                    <button 
                                        className="solid-success-btn create-playlist-btn"
                                        onClick={addVideoToNewPlaylist}
                                    >
                                        Create
                                    </button>
                                </div>
                            ) :
                            (
                                <div 
                                    className="create-new-playlist-option"
                                    onClick={(event)=>{
                                        event.preventDefault()
                                        event.stopPropagation()
                                        setAddToNewPlaylist(true)
                                    }}
                                >
                                    <AiOutlinePlus style={{fontSize: '18px'}}/>
                                    <p>Create new playlist</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        }
        </>
    )
}

export { AddToPlaylistModal }