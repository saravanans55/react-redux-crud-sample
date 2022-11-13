import React from "react";
import './StudentsComponent.css';
import {Button, Row, Col, Table, Form, DropdownButton, Dropdown, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import uuid from 'react-uuid';
// import Swal from 'sweetalert2';
import axios from 'axios';

const API_URL = "https://crudcrud.com/api";

class StudentsComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            def_stu_obj : {
                registerNo : 0,
                firstName: "Saravanan",
                lastName: "S",
                emailAddress: "saravanans@boodskap.io",
                password: "welcome123",
                phoneNumber: "+91 72003 35241",
                homeAddress : "5/210A Sri Venkatachalapathy Nagar, Krishnapuram",
                lastQualifiedEdu : "B.E CSE",
                currQualifiedEdu : "MBA",
                createdTime : 0,
                updatedTime : 0,
                createdBy : "admin",
                updatedBy : "admin"
            },
            student_list : []
        };
    }


    //Registration Form Input Handler
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        const self = this;
        self.state.def_stu_obj[name] = value;

        self.setState(
            self.state
        );
    }

    //Student Registration API
    async confirmRegistration() {
        let self = this;

        self.state.def_stu_obj["registerNo"] = uuid();
        self.state.def_stu_obj["createdTime"] = new Date().getTime();
        self.state.def_stu_obj["updatedTime"] = new Date().getTime();

        let URL = API_URL+'/a6a8e36752c04330b656756e6cb3b4a3/students';
        let headers = {
            headers : {
                "Access-Control-Allow-Origin": "https://crudcrud.com"
            }
        };

        axios.post(URL, self.state.def_stu_obj, headers)
            .then(function (response) {
                console.log(response);
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Success',
                //     text: 'Student Registered Successfully'
                // });
            })
            .catch(function (error) {
                console.log(error);
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: error.message,
                // });
            });
    }

    //Students List API
    async getStudentsList() {
        let self = this;

        axios.get(API_URL+'/a6a8e36752c04330b656756e6cb3b4a3/students',
            {},
            {
                headers: {
                    "Access-Control-Allow-Origin": "https://crudcrud.com",
                    "Content-Type" : "text/plain"
                }
            })
            .then(function (response) {
                console.log(response);
                self.setState(
                    self.state.student_list = response["data"]
                )
            })
            .catch(function (error) {
                console.log(error);
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: error.message,
                // });
            });
    }

    async componentDidMount() {
        console.log("componentDidMount - After rendering html");
        await this.getStudentsList();
    }

    render(){
        return (
            <>
                <Container>
                    <h3>Students</h3>
                    <hr/>
                    <Row>
                        <Col lg={4}>
                            {/*<form className="reg-form-box">
                            <div className="l-form-control">
                                <label>First name</label>
                                <input type="text" id="firstname" />
                            </div>
                            <div className="l-form-control">
                                <label>Last name</label>
                                <input type="text" id="lastname" />
                            </div>
                            <div className="l-form-control">
                                <label>Email</label>
                                <input type="text" id="email" />
                            </div>
                            <div className="l-form-control">
                                <label>Mobile</label>
                                <input type="text" id="mobile" />
                            </div>
                            <div className="l-form-control">
                                <label>Home address</label>
                                <textarea id="home_address"/>
                            </div>

                            <hr/>

                            <Button onClick={this.registration.bind(this)}>Register</Button>

                        </form>*/}

                            <h5>Registration</h5>

                            <Form className="reg-form-box" onSubmit={e => e.preventDefault()}>
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name" name="firstName" value={this.state.def_stu_obj.firstName}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" name="lastName" value={this.state.def_stu_obj.lastName}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="emailAddress">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email address" name="emailAddress" value={this.state.def_stu_obj.emailAddress}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter phone number" name="phoneNumber" value={this.state.def_stu_obj.phoneNumber}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="homeAddress">
                                    <Form.Label>Home Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter home address" name="homeAddress" value={this.state.def_stu_obj.homeAddress}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" name="password" value={this.state.def_stu_obj.password}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="I Agree Terms & Conditions" />
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={this.confirmRegistration.bind(this)}>
                                    Confirm
                                </Button>
                            </Form>
                        </Col>
                        <Col lg={8}>
                            <h5>Student Management</h5>

                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.student_list.length > 0 ?  (this.state.student_list.map(item =>

                                                    <tr key={ item["_id"] }>
                                                        <td>{ item["_id"] }</td>
                                                        <td>{ item["firstName"] }</td>
                                                        <td>{ item["lastName"] }</td>
                                                        <td>{ item["emailAddress"] }</td>
                                                        <td>{ item["phoneNumber"] }</td>
                                                        <td>
                                                            <DropdownButton variant="primary-outline"  title="...">
                                                                <Dropdown.Item as="button" className="li-a-dd"><FontAwesomeIcon icon={faPencil} /> Edit / Update</Dropdown.Item>
                                                                <Dropdown.Item as="button" className="li-a-dd"><FontAwesomeIcon icon={faEye} /> View</Dropdown.Item>
                                                                <Dropdown.Item as="button" className="li-a-dd"><FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                                            </DropdownButton>
                                                        </td>
                                                    </tr>
                                                )) :
                                            (
                                                <tr>
                                                    <td colSpan={6} className="text-center">No Data Available</td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };
}

export default StudentsComponent;