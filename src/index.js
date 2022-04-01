import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ToastContextProvider } from './context/ToastContextProvider';
import { UserLoginContextProvider } from './context/UserLoginContextProvider'
import { TrendingVideosProvider } from './context/TrendingVideosContextProvider';
import { AllVideosContextProvider } from './context/AllVideosContextProvider'
import { WatchLaterContextProvider } from './context/WatchLaterContextProvider'
import { LikedVideosContextProvider } from './context/LikedVideosContextProvider'
import { DislikedVideosContextProvider } from './context/DislikedVideosContextProvider'

export { useToast } from './context/ToastContextProvider';
export { useUserLogin } from './context/UserLoginContextProvider'
export { useTrendingVideos } from './context/TrendingVideosContextProvider'
export { useAllVideos } from './context/AllVideosContextProvider'
export { useWatchLater } from './context/WatchLaterContextProvider'
export { useLikedVideos } from './context/LikedVideosContextProvider'
export { useDislikedVideos } from './context/DislikedVideosContextProvider'

export { Navbar } from "./components/Navbar/Navbar"
export { Toast } from './components/Toast/Toast'
export { Sidebar } from './components/Sidebar/Sidebar'
export { Tabs } from './components/Tabs/Tabs'
export { VideoCard } from './components/VideoCard/VideoCard'
export { Footer } from './components/Footer/Footer'
export { RecommendationCard } from './components/RecommendationCard/RecommendationCard'

export { LikedVideos } from './pages/LikedVideos/LikedVideos'
export { Home } from "./pages/Home/Home"
export { Login } from "./pages/AuthenticationPages/Login"
export { Signup } from "./pages/AuthenticationPages/Signup"
export { VideoListingPage } from "./pages/VideoListingPage/VideoListingPage"
export { VideoPage } from "./pages/VideoPage/VideoPage"
export { WatchLater } from "./pages/WatchLater/WatchLater"
export { AllPlaylistPage } from "./pages/AllPlaylistPage/AllPlaylistPage"
export { History } from "./pages/History/History"

ReactDOM.render(
  <React.StrictMode>
    <UserLoginContextProvider>
      <ToastContextProvider>
        <TrendingVideosProvider>
          <AllVideosContextProvider>
            <WatchLaterContextProvider>
              <LikedVideosContextProvider>
                <DislikedVideosContextProvider>
                  <App/>
                </DislikedVideosContextProvider>
              </LikedVideosContextProvider>
            </WatchLaterContextProvider>
          </AllVideosContextProvider>
        </TrendingVideosProvider>
      </ToastContextProvider>
    </UserLoginContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();