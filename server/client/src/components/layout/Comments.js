import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const Comments = (videoId) => {

    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
        let data = videoId.videoId;

                const res = await axios.get(`/comments/${data}`)
                setComments(res.data)
            } catch (err) { console.log(err); }
        }
        fetchComments();
    }, [videoId,comments]);

    const addComment = async()=>{
        let desc = document.getElementById("commentId").value;
        let data = videoId.videoId;
        if(desc){
            await axios.post("/comments/",{'videoId':data, desc});
            try{
                toast.success("comment Posted", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "light", });
                document.getElementById("commentId").value = "";

            }catch(err){}
        }else{}
    }

    return (
        <>
            <div className='comments'>

                <img src={currentUser.img} alt=""/>
                <input type="text" id="commentId" placeholder="Add a comment..." /><Button variant="outline-secondary" onClick={addComment}>Post</Button>
            </div>
            {comments.map(comment => (
                <Comment key={comment._id} comment={comment} />

            ))}
        </>
    );
}

export default Comments;