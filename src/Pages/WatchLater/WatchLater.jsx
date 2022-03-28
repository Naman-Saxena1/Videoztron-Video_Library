import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import './WatchLater.css'
import {
  Sidebar
} from '../../index'

function WatchLater() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className='watch-later-container'>
        <p>This is Watch Later Page.</p>
      </div>
    </div>
  )
}

export { WatchLater };