import React, {useState} from "react";
import './Books.css';
import {Button, Row, Col, Table, Form, DropdownButton, Dropdown, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import uuid from 'react-uuid';
import Swal from 'sweetalert2';
import axios from 'axios';
import Conf from '../../config/conf';

class Books extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            book_obj : {
                "bookId" : "B1001 ",
                "bookTitle" : "Software Engineering",
                "bookdesc" : "Lorem ipsum content goes to here",
                "price" : 120.50,
                "ratings":5,
                "authorName" : "John Mccullum",
                "readStatus": 50
            },
            book_list : []
        };
    }

    //Registration Form Input Handler
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        const self = this;
        self.state.book_obj[name] = value;

        self.setState(
            self.state
        );
    }

    //Expense Entry API
    async bookEntry() {
        let self = this;

        // self.state.book_obj["firstName"] = "";
        // self.state.book_obj["lastName"] = "";
        // self.state.book_obj["emailId"] = "";

        let URL = Conf.apiUrl+'/book/create';

        axios.post(URL, self.state.book_obj)
            .then(function (response) {
                console.log(response);
                setTimeout(()=>self.getExpenseList(),700);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Book Added Successfully',
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
        let URL = Conf.apiUrl+'/book/delete/'+id;

        axios.delete(URL)
            .then(function (response) {
                console.log(response);
                setTimeout(()=>self.getExpenseList(),700);
                Swal.fire(
                    {
                        title : 'Deleted!',
                        text: "Book record has been deleted.",
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

        axios.get(Conf.apiUrl+'/book/list',{})
            .then(function (response) {
                console.log(response);
                self.setState(
                    self.state.book_list = response.data
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
                self.state["book_obj"] = payload;
                self.setState(
                    self.state
                );
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
                        self.deleteExpense(payload["id"]);
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
                    <h3>Books</h3>
                    <hr/>
                    <Row>
                        <Col lg={4}>
                            <h5>Entry</h5>

                            <Form className="reg-form-box" onSubmit={e => e.preventDefault()}>
                                <Form.Group className="mb-3" controlId="bookId">
                                    <Form.Label>book id</Form.Label>
                                    <Form.Control className="form-inputs" type="text" placeholder="Enter Your book id" name="bookId" value={this.state.book_obj.bookId}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="bookTitle">
                                    <Form.Label>book title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your book title" name="bookTitle" value={this.state.book_obj.bookTitle}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="price">
                                    <Form.Label>price</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Your price" name="price" value={this.state.book_obj.price}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="ratings">
                                    <Form.Label>ratings</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Your ratings" name="ratings" value={this.state.book_obj.ratings}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="authorName">
                                    <Form.Label>author name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your author name" name="authorName" value={this.state.book_obj.authorName}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="readStatus">
                                    <Form.Label>read status</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Your read status" name="readStatus" value={this.state.book_obj.readStatus}
                                                  onChange={(event) => this.handleUserInput(event)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="button" onClick={this.bookEntry.bind(this)}>
                                    Save
                                </Button>
                            </Form>
                        </Col>
                        <Col lg={8}>
                            <h5>List</h5>

                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>Book Name</th>
                                    <th>Price</th>
                                    <th>Ratings</th>
                                    <th>Author Name</th>
                                    <th>Read status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.book_list.length > 0 ?  (this.state.book_list.map(item =>

                                                    <tr key={ item["bookId"] }>
                                                        <td>{ item["bookId"] }</td>
                                                        <td>{ item["bookTitle"] }</td>
                                                        <td>{ item["price"] }</td>
                                                        <td>{ item["ratings"] }</td>
                                                        <td>{ item["authorName"] }</td>
                                                        <td>{ item["readStatus"] }</td>
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

export default Books;