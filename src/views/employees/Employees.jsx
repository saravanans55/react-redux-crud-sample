import React, {useState} from "react";
import './Employees.css';
import {Button, Row, Col, Table, Form, DropdownButton, Dropdown, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import uuid from 'react-uuid';
import Swal from 'sweetalert2';
import axios from 'axios';
import Conf from '../../config/conf';

class Employees extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            employee_obj : {
                "firstName" : 100,
                "lastName" : "",
                "emailId" : "Ledger 1"
            },
            employee_list : []
        };
    }

    //Registration Form Input Handler
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        const self = this;
        self.state.employee_obj[name] = value;

        self.setState(
            self.state
        );
    }

    //Expense Entry API
    async employeeEntry() {
        let self = this;

        // self.state.employee_obj["firstName"] = "";
        // self.state.employee_obj["lastName"] = "";
        // self.state.employee_obj["emailId"] = "";

        let URL = Conf.apiUrl+'/employees';

        axios.post(URL, self.state.employee_obj)
            .then(function (response) {
                console.log(response);
                setTimeout(()=>self.getExpenseList(),700);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Employee Added Successfully',
                    timer: 1500,
                    showConfirmButton: false
                });
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

    //Expense Delete API
    async deleteExpense(id) {

        let self = this;
        let URL = Conf.apiUrl+'/employee/'+id;

        axios.delete(URL)
            .then(function (response) {
                console.log(response);
                setTimeout(()=>self.getExpenseList(),700);
                Swal.fire(
                    {
                        title : 'Deleted!',
                        text: "Employee record has been deleted.",
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false
                    }
                )
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

    //Expense List API
    async getExpenseList() {
        let self = this;

        axios.get(Conf.apiUrl+'/employee',{})
            .then(function (response) {
                console.log(response);
                self.setState(
                    self.state.employee_list = response
                );
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

    //Expense Actions
    openModal = (action, payload) => {
        let self = this;
        console.log("item--------action,payload");
        console.log(action);
        console.log(payload);

        switch(action){
            case 'edit' :
                self.state["employee_obj"] = payload;
                break;

            case 'view' :
                break;

            case 'delete' :
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        self.deleteExpense(payload["_id"]);
                    }
                });
                break;

            default:
                break;
        }
    };

    async componentDidMount() {
        await this.getExpenseList();
    }

    render(){
        return (
            <>
                <Container>
                    <h3>Employees</h3>
                    <hr/>
                    <Row>
                        <Col lg={4}>
                            <h5>Expense Entry</h5>

                            <Form className="reg-form-box" onSubmit={e => e.preventDefault()}>
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control className="form-inputs" type="text" placeholder="Enter Your First Name" name="firstName" value={this.state.employee_obj.firstName}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Ledger name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Last Name" name="lastName" value={this.state.employee_obj.lastName}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="emailId">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Email Address" name="emailId" value={this.state.employee_obj.emailId}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="button" onClick={this.employeeEntry.bind(this)}>
                                    Register
                                </Button>
                            </Form>
                        </Col>
                        <Col lg={8}>
                            <h5>Employees Management</h5>

                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.employee_list.length > 0 ?  (this.state.employee_list.map(item =>

                                                    <tr key={ item["id"] }>
                                                        <td>{ item["firstName"] }</td>
                                                        <td>{ item["lastName"] }</td>
                                                        <td>{ item["emailId"] }</td>
                                                        <td>
                                                            <DropdownButton variant="primary-outline"  title="...">
                                                                <Dropdown.Item as="button" className="li-a-dd" onClick={() => this.openModal('edit', item)}><FontAwesomeIcon icon={faPencil} /> Edit / Update</Dropdown.Item>
                                                                <Dropdown.Item as="button" className="li-a-dd" onClick={() => this.openModal('view', item)}><FontAwesomeIcon icon={faEye} /> View</Dropdown.Item>
                                                                <Dropdown.Item as="button" className="li-a-dd" onClick={() => this.openModal('delete', item)}><FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
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

export default Employees;