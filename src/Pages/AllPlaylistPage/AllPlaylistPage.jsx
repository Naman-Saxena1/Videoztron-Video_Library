import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import './AllPlaylistPage.css'
import {
  Sidebar
} from '../../index'

function AllPlaylistPage() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className='playlist-page-container'>
        <p>This is Playlist Page.</p>
      </div>
    </div>
  )
}

export { AllPlaylistPage };