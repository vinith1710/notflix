import React from "react";
import Comment from "./Comment";
const Comments = () => {
    return(
<>
<div className='comments'>
            
            <img src='' alt='' />
            <input type="text" placeholder="Add a comment..."/>
          </div>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
</>
    );
}

export default Comments;