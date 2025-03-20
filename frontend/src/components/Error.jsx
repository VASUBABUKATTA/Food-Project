import React from 'react'
import Header from '../components/admin/Header'
import Errorimg from '../assets/error.jpg'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
    <Header/>
    <div className='mx-3'>
        <div>
            <img src={Errorimg}alt="no data found" className='w-100 p-5' style={{height:'80vh'}}></img>
        </div>
        {/* <div className='text-center'>
            <Link to='/userPannel'>
            <button className='btn btn-primary text-white px-4 rounded fw-bold shadow'>Go To Home</button>
            </Link>
        </div> */}
    </div>
    </>
    
  )
}

export default ErrorPage
