import { Button, Card } from 'react-bootstrap';
import './EmployeesComponent.css';

export default function EmployeesComponent(props){

    return (
        <div className='container-fluid'>
            <Card className='mt-3'>
                <Card.Header>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <Card.Title>Employee Management</Card.Title>
                        </div>
                        <div className='col-lg-6 d-flex'>
                            <Button className='btn btn-primary ms-auto' onClick={(e) => this.addNewEmployee()}>Add New Employee</Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    
                </Card.Body>
            </Card>
        </div>
    )
};