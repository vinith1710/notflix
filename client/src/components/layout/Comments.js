import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';

const Comments = (videoId) => {

    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comments/${videoId}`)
                setComments(res.data)
            } catch (err) { console.log(err); }
        }
        fetchComments();
    }, [videoId]);

    const addComment = async()=>{
        let desc = document.getElementById("commentId").value;
        console.log("video id",videoId);
        if(desc){
            await axios.post("/comments/",{videoId, desc});
            document.getElementById("commentId").value = "";
        }else{}
    }

    return (
        <>
            <div className='comments'>

                <img src={currentUser.img} />
                <input type="text" id="commentId" placeholder="Add a comment..." /><Button variant="outline-secondary" onClick={addComment}>Post</Button>
            </div>
            {comments.map(comment => (
                <Comment key={comment._id} comment={comment} />

            ))}
        </>
    );
}

export default Comments;