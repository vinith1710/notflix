import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = ({ setOpen }) => {

  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgperc, setImagperc] = useState(0);
  const [videoperc, setVideogperc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImagperc(Math.round(progress)) : setVideogperc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            // console.log('Upload is paused');
            break;
          case 'running':
            // console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => { },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {video && uploadFile(video,"videoUrl") }, [video]);
  useEffect(() => {img && uploadFile(img,"imgUrl") }, [img]);

  const handleUpload=async(e)=>{
    e.preventDefault();
    console.log("inputs",inputs);
    console.log("tags",tags);
    const res = await axios.post("/videos ",{...inputs,tags})
    setOpen(false);
    res.data === 200 && navigate(`/video/${res.data._id}`)
  }

  return (
    <>
      <div className='upload-video'>
        <div className='upload-wrapper'>
          <div className='upload-close' onClick={() => setOpen(false)}>X</div>
          <h1>Upload a Video</h1>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Video:</Form.Label>
            {videoperc > 0 ? ("Uploading " + videoperc + " %") : (<Form.Control type="file" accept='video/*,.mkv' onChange={e => setVideo(e.target.files[0])} />)}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Video Title</Form.Label>
            <Form.Control type="text" name='title' placeholder="Enter the name of the video" onChange={handleChange}  />
          </Form.Group>
          <FloatingLabel controlId="floatingTextarea2" label="Video Description">
            <Form.Control as="textarea" name='desc' placeholder="Enter Video Description" style={{ height: '100px' }} onChange={handleChange}  />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Video Tags</Form.Label>
            <Form.Control type="text" placeholder="Separate each tags with comma" onChange={handleTags} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Thumbnail:</Form.Label>
            {imgperc > 0 ? ("Uploading " + imgperc + " %") : (<Form.Control type="file" accept='image/*' onChange={e => setImg(e.target.files[0])} />)}
          </Form.Group>
          {videoperc == 100 && <Button variant="success" style={{ width: 'max-content', margin: 'auto' }} onClick={handleUpload}>UPLOAD</Button>}
        </div>
      </div>
    </>
  )
}

export default Upload;