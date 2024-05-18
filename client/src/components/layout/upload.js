import React from 'react'

const Upload = ({setOpen}) => {

    

  return (
    <>
    <div className='upload-video'>
        <div className='upload-wrapper'>
            <div className='upload-close' onClick={()=>setOpen(false)}>X</div>
            <h1>Upload a Video</h1>
        </div>
    </div>
    </>
  )
}

export default Upload;