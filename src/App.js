import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
  LikedVideos
} from "./index"

function App() {

  window.YTConfig = {
    host: 'https://www.youtube.com' 
  } 

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/"         exact element={<Home/>} />
          <Route path="/login"          element={<Login/>} />
          <Route path="/signup"         element={<Signup/>} />
          <Route path="/explore"        element={<VideoListingPage/>} />
          <Route path="/video/:id"      element={<VideoPage/>}/>
          <Route path="/watch-later"    element={<WatchLater/>} />
          <Route path="/liked-videos"   element={<LikedVideos/>} />
          <Route path="/playlist"       element={<AllPlaylistPage/>} />
          <Route path="/history"        element={<History/>} />
        </Routes>
        <Toast position="bottom-right"/>
      </div>
    </Router>
  );
}

export default App;