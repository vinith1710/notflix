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
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginOrsignup = () => {
        if (document.getElementById('login-wrapper').style.display === 'flex') {
            document.getElementById('login-wrapper').style.display = 'none'
            document.getElementById('signup-wrapper').style.display = 'flex'
        } else {
            document.getElementById('login-wrapper').style.display = 'flex'
            document.getElementById('signup-wrapper').style.display = 'none'
        }
    }

    const [nameLogin, setNamelogin] = useState("");
    const [passwordLogin, setPasswordlogin] = useState("");
    const [loginerror, setLoginerror] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginValidate();
        if (loginerror === false) {
            dispatch(loginStart())
            const name = nameLogin;
            const password = passwordLogin;
            const res = await axios.post("/auth/signin", { name, password });
            try {
                if (res.status === 201) {
                    toast.warn(res.data.message, { position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
                } else {
                    dispatch(loginSuccess(res.data))
                    navigate("/");
                }
            } catch (err) { dispatch(loginFailure()) }
        }
    }

    const loginValidate = () => {
        if (nameLogin) {
            document.getElementById('nameLogincheck').style.display = 'none';
            setLoginerror(false)
        } else {
            document.getElementById('nameLogincheck').style.display = 'block';
            setLoginerror(true)
        }
        if (passwordLogin) {
            document.getElementById('passwordLogincheck').style.display = 'none';
            setLoginerror(false)
        } else {
            document.getElementById('passwordLogincheck').style.display = 'block';
            setLoginerror(true)
        }
    }

    const [nameSignup, setNamesignup] = useState("");
    const [emailSignup, setEmailsignup] = useState("");
    const [passwordSignup, setPasswordsignup] = useState("");
    const [signuperror, setSignuperror] = useState(true);

    const handleSignup = async (e) => {
        e.preventDefault();
        await signupValidate();
        if (signuperror === false) {
            const name = nameSignup;
            const email = emailSignup;
            const password = passwordSignup;
            const res = await axios.post("/auth/signup", { name, email, password });
            try {
                if (res.status === 200) { toast.success(res.data, { position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "light", }); }
                else { toast.error(res.data, { position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "light", }); }
            } catch (err) { console.log("Sign in error->", err); }
        }
    }

    const signupValidate = () => {
        const mailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordpattern = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,})$/;
        if (nameSignup) {
            if (nameSignup.length <= 2) {
                document.getElementById('nameSignupcheck').style.display = 'none';
                document.getElementById('nameSignupvalid').style.display = 'block';
                setSignuperror(true);
            } else {
                document.getElementById('nameSignupcheck').style.display = 'none';
                document.getElementById('nameSignupvalid').style.display = 'none';
                setSignuperror(false);
            }
        } else {
            document.getElementById('nameSignupcheck').style.display = 'block';
            document.getElementById('nameSignupvalid').style.display = 'none';
            setSignuperror(true);
        }
        if (emailSignup) {
            if (emailSignup.match(mailpattern)) {
                document.getElementById('emailSignupcheck').style.display = 'none';
                document.getElementById('emailSignupvalid').style.display = 'none';
                setSignuperror(false);
            } else {
                document.getElementById('emailSignupcheck').style.display = 'none';
                document.getElementById('emailSignupvalid').style.display = 'block';
                setSignuperror(true);
            }
        } else {
            document.getElementById('emailSignupcheck').style.display = 'block';
            document.getElementById('emailSignupvalid').style.display = 'none';
            setSignuperror(true);
        }
        if (passwordSignup) {
            if (passwordSignup.match(passwordpattern)) {
                document.getElementById('passwordSignupcheck').style.display = 'none';
                document.getElementById('passwordSignupvalid').style.display = 'none';
                setSignuperror(false);
            } else {
                document.getElementById('passwordSignupcheck').style.display = 'none';
                document.getElementById('passwordSignupvalid').style.display = 'block';
                setSignuperror(true);
            }
        } else {
            document.getElementById('passwordSignupcheck').style.display = 'block';
            document.getElementById('passwordSignupvalid').style.display = 'none';
            setSignuperror(true);
        }
        return;
    }

    const signInWithGoogle = async () => {
        dispatch(loginStart())
        signInWithPopup(auth, provider)
            .then((result) => {
                axios.post("/auth/google", {
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                }).then((res) => {
                    dispatch(loginSuccess(res.data))
                    navigate("/");
                })
            })
            .catch((error) => {
                dispatch(loginFailure())
            })
    }
    return (
        <div className='content login'>
            <div id='login-wrapper'>
                <h3>Sign In</h3>
                <h5>To continue to NOTFLIX</h5>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your User name" onChange={e => setNamelogin(e.target.value)} />
                            </Form.Group>
                            <div className='label-error' id='nameLogincheck'>Enter a user name</div>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter a password" onChange={e => setPasswordlogin(e.target.value)} />
                            </Form.Group>
                            <div className='label-error' id='passwordLogincheck'>Enter a Password</div>

                        </Col>
                    </Row>
                    <Row>
                        <Button variant="primary" style={{ width: 'max-content', margin: 'auto' }} onClick={handleLogin}>LOG IN</Button>{' '}
                    </Row>
                </Form>
                <hr />

                <Button variant="warning" style={{ width: 'max-content', margin: 'auto' }} onClick={signInWithGoogle}>Sign in with Google</Button>{' '}

                <hr />
                <div>To create a New Account: <Button variant="success" onClick={loginOrsignup}>Sign Up</Button> </div>
                <div className='login-bottom'>
                    <h5>Notflix India</h5>
                    <div>
                        <span>Help</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                </div>
            </div>

            <div id='signup-wrapper'>
                <h3>Sign Up</h3>
                <h5>To create new account</h5>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your User name" onChange={e => setNamesignup(e.target.value)} />
                            </Form.Group>
                            <div className='label-error' id='nameSignupcheck'>Enter a user name</div><div className='label-error' id='nameSignupvalid'>Username should be more than three characters</div>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter a password" onChange={e => setPasswordsignup(e.target.value)} />
                            </Form.Group>
                            <div className='label-error' id='passwordSignupcheck'>Enter a Password</div><div className='label-error' id='passwordSignupvalid'>Enter a strong Password</div>


                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="text" placeholder="Enter your Email Id" onChange={e => setEmailsignup(e.target.value)} />
                            </Form.Group>
                            <div className='label-error' id='emailSignupcheck'>Enter your E-Mail ID</div><div className='label-error' id='emailSignupvalid'>Email is not valid</div>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="success" style={{ width: 'max-content', margin: 'auto' }} onClick={handleSignup}>SIGN UP</Button>{' '}
                        
                    </Row>
                </Form>
                <hr />
                <div>Already have an Account: <Button variant="primary" onClick={loginOrsignup}>Log In</Button></div>
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