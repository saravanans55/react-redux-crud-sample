import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "./HomeLayout.css"

const HomeLayout = () => {

  return (
    <>
      <Navbar className="header-border" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{"color": "#ffffff"}}>Admin Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />  
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/books">Books</Nav.Link>
            <NavDropdown title="Administration" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/students">Students</NavDropdown.Item>
              <NavDropdown.Item href="/employees">
                Employees
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/expenses">Expenses</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search Books"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Outlet />
    </>
  )
  
};

export default HomeLayout;