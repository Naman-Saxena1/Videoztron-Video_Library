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
import { Link } from "react-router-dom"

function Sidebar()
{
    return (
        <div className="sidebar">
            <Link to="/">
                <div className="sidebar-options">
                    <AiOutlineHome className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">Home</p>
                </div>
            </Link>
            <Link to="/explore">
                <div className="sidebar-options">
                    <MdOutlineExplore className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">Explore</p>
                </div>
            </Link>
            <Link to="/watch-later">
                <div className="sidebar-options">
                    <MdAccessTime className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">Watch Later</p>
                </div>
            </Link>
            <Link to="/playlist">
                <div className="sidebar-options">
                    <MdPlaylistPlay className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">Playlists</p>
                </div>
            </Link>
            <Link to="/history">
                <div className="sidebar-options">
                    <MdHistory className="sidebar-options-icons" style={{fontSize: "20px"}}/>
                    <p className="sidebar-options-text">History</p>
                </div>
            </Link>
        </div>
    )
}

export { Sidebar }