import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContextProvider } from './Context/toast-context';
import { UserLoginContextProvider } from './Context/user-login-context'
import reportWebVitals from './reportWebVitals';

export { useToast } from './Context/toast-context';
export { useUserLogin } from './Context/user-login-context'

export { Navbar } from "./Components/Navbar/Navbar"
export { Toast } from './Components/Toast/Toast'
export { Sidebar } from './Components/Sidebar/Sidebar'

export { Home } from "./Pages/Home/Home"
export { Login } from "./Pages/AuthenticationPages/Login"
export { Signup } from "./Pages/AuthenticationPages/Signup"
export { VideoListingPage } from "./Pages/VideoListingPage/VideoListingPage"
export { WatchLater } from "./Pages/WatchLater/WatchLater"
export { AllPlaylistPage } from "./Pages/AllPlaylistPage/AllPlaylistPage"
export { History } from "./Pages/History/History"

ReactDOM.render(
  <React.StrictMode>
    <UserLoginContextProvider>
      <ToastContextProvider>
        <App/>
      </ToastContextProvider>
    </UserLoginContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
