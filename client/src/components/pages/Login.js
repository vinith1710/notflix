import React, { useState } from 'react';
import './pages.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { auth, provider } from '../../firebase';
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin= async (e) =>{
        e.preventDefault();
        dispatch(loginStart())
        try{
            const res = await axios.post("/auth/signin",{name,password});
            dispatch(loginSuccess(res.data))
            navigate("/");
        }catch(err){
            dispatch(loginFailure())
        }
    }

    const signInWithGoogle = async () => {
        dispatch(loginStart())
        signInWithPopup(auth,provider)
        .then((result)=>{
            console.log(result);
            axios.post("/auth/google",{
                name:result.user.displayName,
                email:result.user.email,
                img:result.user.photoURL,
            }).then((res)=>{
                dispatch(loginSuccess(res.data))
                navigate("/");
            })
        })
        .catch((error)=>{
            dispatch(loginFailure())
        })
    }
    return (
        <div className='content login'>
            <div className='login-wrapper'>
                <h3>Sign In</h3>
                <h5>To continue to NOTFLIX</h5>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your User name" onChange={e=>setName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="Enter a password" onChange={e=>setPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="primary" style={{ width: 'max-content', margin: 'auto' }} onClick={handleLogin}>LOG IN</Button>{' '}
                    </Row>
                </Form>
                <hr />

                <Button variant="warning" style={{ width: 'max-content', margin: 'auto' }} onClick={signInWithGoogle}>Sign in with Google</Button>{' '}

                <hr />
                <h3>Sign Up</h3>
                <h5>To create new account</h5>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your User name" onChange={e=>setName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="Enter a password" onChange={e=>setPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="text" placeholder="Enter your Email Id" onChange={e=>setEmail(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="success" style={{ width: 'max-content', margin: 'auto' }} >SIGN UP</Button>{' '}
                    </Row>
                </Form>
                <div className='login-bottom'>
                <h5>Notflix India</h5>
                <div>
                    <span>Help</span>
                    <span>Privacy</span>
                    <span>Terms</span>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Login