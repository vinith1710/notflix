import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Upload = ({ setOpen }) => {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgperc, setImagperc] = useState(0);
  const [videoperc, setVideogperc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [uploaderror, setUploaderror] = useState(false);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // const handleTags = (e) => {
  //   setTags(e.target.value.split(","));
  // };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImagperc(Math.round(progress)) : setVideogperc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
          default:
            break;
        }
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (video) {
      if(videoperc === 0){
        uploadFile(video,"videoUrl")
      }
      document.getElementById('videoCheck').style.display = 'none';
    } else { document.getElementById('videoCheck').style.display = 'block'; }
    if (img) {

      if(imgperc === 0){
        uploadFile(img,"imgUrl")
      }
      document.getElementById('imageCheck').style.display = 'none';
    } else { document.getElementById('imageCheck').style.display = 'block'; }
    if (inputs.title) {
      document.getElementById('titleCheck').style.display = 'none';
      setUploaderror(true);
    } else {setUploaderror(false); document.getElementById('titleCheck').style.display = 'block'; }
    if (inputs.desc) {
      document.getElementById('descCheck').style.display = 'none';
      setUploaderror(true);
    } else {setUploaderror(false); document.getElementById('descCheck').style.display = 'block'; }
    if (inputs.tags) {
      document.getElementById('tagsCheck').style.display = 'none';
      setUploaderror(true);
    } else {setUploaderror(false); document.getElementById('tagsCheck').style.display = 'block'; }
  }
  
  const handlePost=async()=>{
    const res = await axios.post("https://notflix-server-nine.vercel.app/api/videos ",inputs)
    setOpen(false);
    res.data === 200 && navigate(`/video/${res.data._id}`)
    toast.success("Video Successfully Uploaded", { position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "light", });

  }
  return (
    <>
      <div className='upload-video'>
        <div className='upload-wrapper'>
          <div className='upload-close' onClick={() => setOpen(false)}>X</div>
          <h1>Upload a Video</h1>
          <Form.Group className="mb-3">
            <Form.Label>Video:</Form.Label>
            {videoperc > 0 ? ("Uploading " + videoperc + " %") : (<Form.Control type="file" accept='video/*,.mkv' onChange={e => setVideo(e.target.files[0])} />)}
          </Form.Group>
          <div id='videoCheck' className='label-error'>Select a video</div>
          <Form.Group className="mb-3" >
            <Form.Label>Video Title</Form.Label>
            <Form.Control type="text" name='title' placeholder="Enter the name of the video" onChange={handleChange} id='videoTitle' />
          </Form.Group>
          <div id='titleCheck' className='label-error'>Enter video Title</div>
          <FloatingLabel label="Video Description">
            <Form.Control as="textarea" name='desc' placeholder="Enter Video Description" style={{ height: '100px' }} onChange={handleChange} id='videoDesc' />
          </FloatingLabel>
          <div id='descCheck' className='label-error'>Enter video Description</div>

          <Form.Group className="mb-3" >
            {/* <Form.Label>Video Tags</Form.Label>
            <Form.Control type="text" placeholder="Separate each tags with comma" onChange={handleTags} /> */}
            <Form.Select name='tags' id='videoTag' aria-label="Default select example" onChange={handleChange}>
      <option value="">Select a Tag</option>
      <option value="Movie">Movie</option>
      <option value="TvSeries">TvSeries</option>
      <option value="Animation">Animation</option>
      <option value="Anime">Anime</option>
    </Form.Select>
          </Form.Group>
          <div id='tagsCheck' className='label-error'>Select a Tag</div>

          <Form.Group className="mb-3">
            <Form.Label>Thumbnail:</Form.Label>
            {imgperc > 0 ? ("Uploading " + imgperc + " %") : (<Form.Control type="file" accept='image/*' onChange={e => setImg(e.target.files[0])} />)}
          </Form.Group>
          <div id='imageCheck' className='label-error'>Select an Image</div>

          {/* {videoperc === 100 ? <Button variant="success" onClick={handleUpload}>UPLOAD</Button> : <Button variant="secondary" size="lg" disabled>UPLOAD</Button>} */}
          {inputs.videoUrl && inputs.imgUrl && uploaderror ? (<Button variant="success" disabled onClick={handleUpload}>UPLOAD</Button>) : (<Button variant="success" onClick={handleUpload}>UPLOAD</Button>)}
          {inputs.videoUrl && inputs.imgUrl && uploaderror ? (<Button variant="primary"  onClick={handlePost}>POST VIDEO</Button>) : (<Button variant="primary" disabled onClick={handlePost}>POST VIDEO</Button>)}
        </div>
      </div>
    </>
  )
}

export default Upload;
