import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import './Home.css'
import {
  Sidebar
} from '../../index'

function Home() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(()=>{
      const token=localStorage.getItem('token')

      if(token)
      {
          const user = jwt_decode(token)
          if(!user)
          {
              localStorage.removeItem('token')
          }
          else
          {
              // (async function getUpdatedUserData()
              // {
              //     let updatedUserInfo = await axios.get(
              //     "http://localhost:1337/api/user",
              //     {
              //         headers:
              //         {
              //         'x-access-token': localStorage.getItem('token'),
              //         }
              //     })

              //     if(updatedUserInfo.data.status==="ok")
              //     {
              //         dispatchUserWishlist({type: "UPDATE_USER_WISHLIST",payload: updatedUserInfo.data.user.wishlist})
              //         dispatchUserCart({type: "UPDATE_USER_CART",payload: updatedUserInfo.data.user.cart})
              //     }
              // })()
          }
      }   
  },[])

  return (
    <div className='page-container'>
      <Sidebar/>
      <div className='home-page-container'>
        <p>This is Home Page.</p>
      </div>
    </div>
  )
}

export { Home };