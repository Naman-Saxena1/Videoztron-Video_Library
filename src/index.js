import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ToastContextProvider } from './Context/toast-context';
import { UserLoginContextProvider } from './Context/user-login-context'
import { TrendingVideosProvider } from './Context/trending-videos-context';
import { AllVideosProvider } from './Context/all-videos-context'
import { WatchLaterContextProvider } from './Context/watch-later-context'
import { LikedVideosContextProvider } from './Context/liked-videos-context'
import { DislikedVideosContextProvider } from './Context/disliked-videos-context'

export { useToast } from './Context/toast-context';
export { useUserLogin } from './Context/user-login-context'
export { useTrendingVideos } from './Context/trending-videos-context'
export { useAllVideos } from './Context/all-videos-context'
export { useWatchLater } from './Context/watch-later-context'
export { useLikedVideos } from './Context/liked-videos-context'
export { useDislikedVideos } from './Context/disliked-videos-context'

export { Navbar } from "./Components/Navbar/Navbar"
export { Toast } from './Components/Toast/Toast'
export { Sidebar } from './Components/Sidebar/Sidebar'
export { Tabs } from './Components/Tabs/Tabs'
export { VideoCard } from './Components/VideoCard/VideoCard'
export { Footer } from './Components/Footer/Footer'
export { RecommendationCard } from './Components/RecommendationCard/RecommendationCard'
export { LikedVideos } from './Pages/LikedVideos/LikedVideos'

export { Home } from "./Pages/Home/Home"
export { Login } from "./Pages/AuthenticationPages/Login"
export { Signup } from "./Pages/AuthenticationPages/Signup"
export { VideoListingPage } from "./Pages/VideoListingPage/VideoListingPage"
export { VideoPage } from "./Pages/VideoPage/VideoPage"
export { WatchLater } from "./Pages/WatchLater/WatchLater"
export { AllPlaylistPage } from "./Pages/AllPlaylistPage/AllPlaylistPage"
export { History } from "./Pages/History/History"

ReactDOM.render(
  <React.StrictMode>
    <UserLoginContextProvider>
      <ToastContextProvider>
        <TrendingVideosProvider>
          <AllVideosProvider>
            <WatchLaterContextProvider>
              <LikedVideosContextProvider>
                <DislikedVideosContextProvider>
                  <App/>
                </DislikedVideosContextProvider>
              </LikedVideosContextProvider>
            </WatchLaterContextProvider>
          </AllVideosProvider>
        </TrendingVideosProvider>
      </ToastContextProvider>
    </UserLoginContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();