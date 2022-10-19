import React, {useState} from "react";
import './Expenses.css';
import {Button, Row, Col, Table, Form, DropdownButton, Dropdown, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import uuid from 'react-uuid';
import Swal from 'sweetalert2';
import axios from 'axios';
import Conf from '../../config/conf';

class Expenses extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            expense_obj : {
                "amount" : 100,
                "ledger_id" : "",
                "ledger_name" : "Ledger 1",
                "category" : "Food",
                "expense_details" : "Pizza Medium Cheese burst",
                "paid_date" : "2022-10-17",
                "paid_time" : "11:28",
                "payment_type" : "Online",
                "attachments" : "",
                "user_id" : "",
                "created_by" : "",
                "updated_by" : "",
                "created_time" : 0,
                "updated_time" : 0
            },
            expense_list : []
        };
    }

    //Registration Form Input Handler
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        const self = this;
        self.state.expense_obj[name] = value;

        self.setState(
            self.state
        );
    }

    //Expense Entry API
    async expenseEntry() {
        let self = this;

        self.state.expense_obj["ledger_id"] = self.state.expense_obj["ledger_name"].replace(/ /g,"_");
        self.state.expense_obj["user_id"] = "johndoe@dummy.email";
        self.state.expense_obj["created_by"] = "johndoe@dummy.email";
        self.state.expense_obj["updated_by"] = "johndoe@dummy.email";
        self.state.expense_obj["created_time"] = new Date().getTime();
        self.state.expense_obj["updated_time"] = new Date().getTime();

        let URL = Conf.apiUrl+'/expense/add';

        axios.post(URL, self.state.expense_obj)
            .then(function (response) {
                console.log(response);
                setTimeout(()=>self.getExpenseList(),700);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Expense Added Successfully',
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
        let URL = Conf.apiUrl+'/expense/delete';

        let inputObj = {
            "_id": id
        };

        axios.post(URL, inputObj)
            .then(function (response) {
                console.log(response);
                setTimeout(()=>self.getExpenseList(),700);
                Swal.fire(
                    {
                        title : 'Deleted!',
                        text: "Entry has been deleted.",
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

        axios.post(Conf.apiUrl+'/expense/list',{})
            .then(function (response) {
                console.log(response);
                self.setState(
                    self.state.expense_list = response["data"]["result"]["data"]["data"]
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
                self.state["expense_obj"] = payload;
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
                    <h3>Expenses</h3>
                    <hr/>
                    <Row>
                        <Col lg={4}>
                            <h5>Expense Entry</h5>

                            <Form className="reg-form-box" onSubmit={e => e.preventDefault()}>
                                <Form.Group className="mb-3" controlId="amount">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control className="form-inputs" type="number" placeholder="Enter amount" name="amount" value={this.state.expense_obj.amount}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="ledger_name">
                                    <Form.Label>Ledger name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Ledger Name" name="ledger_name" value={this.state.expense_obj.ledger_name}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Category" name="category" value={this.state.expense_obj.category}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="expense_details">
                                    <Form.Label>Expense Details</Form.Label>
                                    <Form.Control type="text" placeholder="About Your Expense" name="expense_details" value={this.state.expense_obj.expense_details}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3" controlId="paid_date">
                                            <Form.Label>Paid Date</Form.Label>
                                            <Form.Control type="date" placeholder="DD/MM/YYYY" name="paid_date" value={this.state.expense_obj.paid_date}
                                                          onChange={(event) => this.handleUserInput(event)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3" controlId="paid_time">
                                            <Form.Label>Paid Time</Form.Label>
                                            <Form.Control type="time" placeholder="HH:MM" name="paid_time" value={this.state.expense_obj.paid_time}
                                                          onChange={(event) => this.handleUserInput(event)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3" controlId="payment_type">
                                    <Form.Label>Payment Type</Form.Label>
                                    <Form.Control type="text" placeholder="Choose Payment Type" name="payment_type" value={this.state.expense_obj.payment_type}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="attachments">
                                    <Form.Label>Attachments</Form.Label>
                                    <Form.Control type="file" placeholder="Choose attachments" name="attachments" value={this.state.expense_obj.attachments}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="button" onClick={this.expenseEntry.bind(this)}>
                                    Make Entry
                                </Button>
                            </Form>
                        </Col>
                        <Col lg={8}>
                            <h5>Expenses Management</h5>

                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Entry date</th>
                                    <th>Ledger Name</th>
                                    <th>Category</th>
                                    <th>Expense Details</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.expense_list.length > 0 ?  (this.state.expense_list.map(item =>

                                                    <tr key={ item["_id"] }>
                                                        <td>{ item["paid_date"] } { item["paid_time"] }</td>
                                                        <td>{ item["ledger_name"] }</td>
                                                        <td>{ item["category"] }</td>
                                                        <td>{ item["expense_details"] }</td>
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

export default Expenses;