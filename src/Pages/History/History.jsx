import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import './History.css'
import {
  Sidebar
} from '../../index'

function History() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className='history-page-container'>
        <p>This is History Page.</p>
      </div>
    </div>
  )
}

export { History };