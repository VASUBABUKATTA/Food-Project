import React, { useState } from 'react'


function Header() {
 
  return (
    <div>
       <div className='text-light w-100 sticky-top' style={{ height: '60px', backgroundColor: 'midnightblue' }}>
        <div className='container w-100 h-100'>
          <div className='w-100 h-100 d-flex justify-content-between align-items-center'>
            <div className='ms-5'>
              <h3>The Place Drive in</h3>
            </div>
            {/* <div className='ms-5'>
              <h3>Total No Of Counters : 08</h3>
            </div> */}
            {/* <div ><Button variant="contained" onClick={addCounter}>ADD COUNTER</Button></div> */}
          </div>
        </div>
        {/* {showAddCounter && <AddCounter />}s */}
      </div>
    </div>
  )
}

export default Header
