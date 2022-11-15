import React, { useEffect, useState } from 'react';
import { Button, Card, Dropdown, DropdownButton, Form, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencil, faPlus, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import './BooksComponent.css';

let API_URL = "http://localhost:10001/api/v1";

export default function BooksComponent(props){
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [booksList, setBooksList] = useState([]);

    const bookSubmit = (event) =>{
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    const createBook = () =>{

        let bookObj = {
            "bookId": "B1005",
            "bookTitle": "Test Book 5",
            "bookDesc": "5 Lorem ipsum content goes to here",
            "price": 555.32,
            "readStatus": 55,
            "ratings": 5,
            "authorName": "Author Test 5"
        };

        let URL = API_URL+'/book/create';
        let headers = {
           "Content-Type" : "application/json",
           "headers" : {
                "Access-Control-Allow-Origin": "*"
           }
        };

        axios.post(URL, bookObj, headers)
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Student Registered Successfully'
                });
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

    const getBooksList= () =>  {
        console.log("getBooksList API Triggered.....")

        axios.get(API_URL+'/book/list',
            {},
            {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Content-Type" : "application/json"
                }
            })
            .then(function (response) {
                console.log(response["data"]);
                setBooksList(response["data"]);
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

    useEffect(() => {
        getBooksList();
      }, []);

    return (
        <div className='container-fluid'>
            <Card className='mt-3'>
            <Card.Header>
                <div className='row'>
                    <div className='col-lg-6'>
                        <Card.Title>Book Management</Card.Title>
                    </div>
                    <div className='col-lg-6 d-flex'>
                        <div className='ms-auto'>
                            <Button className='btn btn-primary' onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add New Book</Button>
                            <Button className='btn btn-primary ms-2' onClick={getBooksList}><FontAwesomeIcon icon={faRefresh} /> Refresh</Button>
                        </div>                    
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div className='row'>
                    <div className='col-lg-12'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#BID</th>
                                <th>Book Title</th>
                                <th>Author Name</th>
                                <th>Price</th>
                                <th>Ratings</th>
                                <th>Read Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {booksList.map(function(book, i){
                            return <tr key={i}>
                                <td>{book.bookId}</td>
                                <td>{book.bookTitle}</td>
                                <td>{book.authorName}</td>
                                <td>{book.price}</td>
                                <td>{book.ratings}</td>
                                <td>{book.readStatus}%</td>
                                <td>
                                    <DropdownButton variant="primary-outline"  title="...">
                                        <Dropdown.Item as="button" className="li-a-dd"><FontAwesomeIcon icon={faPencil} /> Edit / Update</Dropdown.Item>
                                        <Dropdown.Item as="button" className="li-a-dd"><FontAwesomeIcon icon={faEye} /> View</Dropdown.Item>
                                        <Dropdown.Item as="button" className="li-a-dd"><FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>;
                        })}
                        </tbody>
                    </Table>
                    </div>
                </div>
            </Card.Body>
            </Card>

            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Book</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated}  onSubmit={bookSubmit}>
                    <Modal.Body>
                            <Form.Group className="mb-3" controlId="bookId">
                                <Form.Label>Book Id</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Id" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="bookTitle">
                                <Form.Label>Book Tile</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Title" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" min={0} max={99999} placeholder="Enter Price" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="ratings">
                                <Form.Label>Ratings</Form.Label>
                                <Form.Control type="number" min={0} max={5} placeholder="Enter Ratings" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="authorName">
                                <Form.Label>Author Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Author Name" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="bookDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Description" />
                            </Form.Group>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='button' variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary">
                            Confirm, Proceed 
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
