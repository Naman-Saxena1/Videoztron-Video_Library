import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import './VideoListingPage.css'
import {
  Sidebar
} from '../../index'

function VideoListingPage() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className='video-listing-page-container'>
        <p>This is Video Listing Page for explore option.</p>
      </div>
    </div>
  )
}

export { VideoListingPage };