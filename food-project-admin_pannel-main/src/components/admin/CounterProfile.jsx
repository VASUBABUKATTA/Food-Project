import React from 'react'

import Typography from '@mui/material/Typography'

import { ArrowBackIosTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';




function CounterProfile({counter,goBack}) {
  console.log(counter);
  
  return (
    // <>
    //   <div className='row mb-2 ms-3'>
    //     <div className='col-6 mt-3 d-flex ms-5'> <Link to="" className='ms-5' style={{textDecoration:"none"}}> <ArrowBackIosTwoTone
    //                         onClick={goBack}
    //                         style={{ fontSize: 30, color: "dark", cursor: "pointer", fontWeight: "bold" }}
    //                     /></Link><Typography variant='h5' className='text-center fw-bold fs-4 ms-2' color='midnightblue'>Counter Profile Information :</Typography></div>
        

    //     </div>
    //   <div className='bg-seondary ms-3 mb-2'>
    //     <div className=''>
    //       <div className='row'>
            
    //         <div className="col-6 d-flex justify-content-center align-items-center">
    //           <div className="d-inline-block">
    //             <Typography variant="h5" className='fw-bold fs-4' sx={{ mb: 2 }}>
    //               Counter Name: <span style={{ fontWeight: "normal",color:"darkblue" }}>{counter.COUNTERNAME}</span>
    //             </Typography>
    //             <Typography variant="h5" className='fw-bold fs-4' sx={{ mb: 2 }}>
    //               Mobile Number: <span style={{ fontWeight: "normal",color:"royalblue" }}>{counter.MOBILENO}</span>
    //             </Typography>
    //             <Typography variant="h5" className='fw-bold fs-4'>
    //               From: <span style={{ fontWeight: "normal",color:"blue" }}>{counter.CREATED_AT}</span>
    //             </Typography>
    //           </div>
    //         </div>
    //         <div className='col-6'>
    //           <img src={`http://localhost:9090${counter.IMAGEPATH}`} alt="Smiley face" width={500} height={300} className='rounded-circle' />
    //         </div>

    //       </div>
    //       <div className='row my-3'>
    //         <div className="col-6 d-flex justify-content-center align-items-center  " >
    //           <div className='d-inline-block p-4 rounded text-white fw-bold fs-4' style={{backgroundColor:"midnightblue"}}>
    //             <Typography variant="h5" sx={{ mb: 4 }}>
    //               Vendor Name: <span style={{ fontWeight: "normal" }}>{counter.OWNERNAME}</span>
    //             </Typography>
    //             <Typography variant="h5">
    //               Email: <span style={{ fontWeight: "normal" }}>{counter.EMAIL}</span>
    //             </Typography>
    //           </div>
    //         </div>
    //         <div className="col-6 mt-2 d-flex justify-content-center align-items-center " >
    //           <div className='d-inline-block p-3 ms-4 rounded text-white fw-bold fs-4'style={{backgroundColor:"darkblue"}}>
    //             <Typography variant="h5" sx={{ mb: 5 }}>
    //               Total Orders: <span style={{ fontWeight: "normal" }}>852</span>
    //             </Typography>
    //             <Typography variant="h5">
    //               Total Amout: <span style={{ fontWeight: "normal" }}>9874560</span>
    //             </Typography>
    //           </div>
    //         </div>
    //       </div>

    //     </div >
    //   </div>
     
    // </>
<>
<div className='col-6 mt-3 d-flex ms-5'> <Link to="" className='ms-5' style={{textDecoration:"none"}}> <ArrowBackIosTwoTone
                            onClick={goBack}
                            style={{ fontSize: 30, color: "dark", cursor: "pointer", fontWeight: "bold" }}
                        /></Link><Typography variant='h5' className='text-center fw-bold fs-4 ms-2' color='midnightblue'>Counter Profile Information :</Typography></div>
        

</>
  )
}

export default CounterProfile