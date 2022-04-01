import "./Sidebar.css"
import {
    AiOutlineHome
} from "react-icons/ai"
import {
    MdOutlineExplore,
    MdAccessTime,
    MdPlaylistPlay,
    MdHistory
} from "react-icons/md"
import {
    AiOutlineLike
} from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"

function Sidebar()
{
    let location = useLocation()
    let urlPath  = location.pathname

    return (
        <div className="sidebar">
            <Link to="/">
                <div className={urlPath==="/"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <AiOutlineHome className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">Home</p>
                </div>
            </Link>
            <Link to="/explore">
                <div className={urlPath==="/explore"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <MdOutlineExplore className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">Explore</p>
                </div>
            </Link>
            <Link to="/watch-later">
                <div className={urlPath==="/watch-later"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <MdAccessTime className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">Watch Later</p>
                </div>
            </Link>
            <Link to="/liked-videos">
                <div className={urlPath==="/liked-videos"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <AiOutlineLike className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">Liked Videos</p>
                </div>
            </Link>
            <Link to="/playlist">
                <div className={urlPath==="/playlist"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <MdPlaylistPlay className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">Playlists</p>
                </div>
            </Link>
            <Link to="/history">
                <div className={urlPath==="/history"?`sidebar-options active-sidebar-option`:`sidebar-options`}>
                    <MdHistory className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">History</p>
                </div>
            </Link>
        </div>
    )
}

export { Sidebar }