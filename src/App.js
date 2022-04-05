import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import jwt_decode from "jwt-decode"
import { 
  Navbar, 
  Toast,
  Home,
  Login,
  Signup,
  VideoListingPage,
  VideoPage,
  WatchLater,
  AllPlaylistPage,
  History,
  LikedVideos,
  usePlaylist,
  IndividualPlaylistPage
} from "./index"
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const { allPlaylists, setAllPlaylists } = usePlaylist()

  window.YTConfig = {
    host: 'https://www.youtube.com' 
  } 

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

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/"                 exact element={<Home/>} />
          <Route path="/login"                  element={<Login/>} />
          <Route path="/signup"                 element={<Signup/>} />
          <Route path="/explore"                element={<VideoListingPage/>} />
          <Route path="/video/:id"              element={<VideoPage/>}/>
          <Route path="/watch-later"            element={<WatchLater/>} />
          <Route path="/liked-videos"           element={<LikedVideos/>} />
          <Route path="/playlist"               element={<AllPlaylistPage/>} />
          <Route path="/playlist/:playlistId"   element={<IndividualPlaylistPage/>} />
          <Route path="/history"                element={<History/>} />
        </Routes>
        <Toast position="bottom-right"/>
      </div>
    </Router>
  );
}

export default App;