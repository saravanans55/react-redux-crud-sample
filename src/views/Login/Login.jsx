import React, {useState} from "react";
import './Login.css';
import {Button, Row, Col, Table, Form, DropdownButton, Dropdown, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import uuid from 'react-uuid';
import Swal from 'sweetalert2';
import axios from 'axios';
import Conf from '../../config/conf';

const Login = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

    const doLogin = () => {
        let URL = Conf.apiUrl+'/auth/login';
        let authObj = {
            email : email,
            password : password
        };

        axios.post(URL, authObj)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    timer: 1000,
                    showConfirmButton: false
                });
            });
    }

    return(
        <>
            <Container>
                <h3>Login</h3>
                <hr/>
                <Row>
                    <Col lg={4}>
                        <h5>Login to confirm your authentication</h5>

                        <Form className="reg-form-box" onSubmit={e => e.preventDefault()}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control className="form-inputs" type="email" placeholder="Enter Your Email Address" name="email" value={email}
                                              onChange={(event) => handleEmailChange(event)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Your Password" name="password" value={password}
                                              onChange={(event) => handlePasswordChange(event)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={doLogin}>
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;