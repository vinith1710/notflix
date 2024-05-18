import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";
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

    return (
        <>
            <div className='comments'>

                <img src={currentUser.img}/>
                <input type="text" placeholder="Add a comment..." />
            </div>
            {comments.map(comment=>(
                <Comment key={comment._id} comment={comment}/>

            ))}
        </>
    );
}

export default Comments;