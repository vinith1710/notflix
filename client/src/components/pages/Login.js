import React from 'react';
import './pages.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Login = () => {
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
                                <Form.Control type="text" placeholder="Enter your User name" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="Enter a password" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="primary" style={{ width: 'max-content', margin: 'auto' }}>LOG IN</Button>{' '}
                    </Row>

                </Form>
                <hr />
                <h3>Sign Up</h3>
                <h5>To create new account</h5>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your User name" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="Enter a password" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="text" placeholder="Enter your Email Id" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="success" style={{ width: 'max-content', margin: 'auto' }}>SIGN UP</Button>{' '}
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