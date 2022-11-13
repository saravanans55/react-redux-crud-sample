import { Button, Card } from "react-bootstrap";

const HomeComponent = (props) => {

    return (
        <div className='container-fluid'>
            <Card className='mt-3'>
                <Card.Header>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <Card.Title>Home</Card.Title>
                        </div>
                        <div className='col-lg-6 d-flex'>
                            <Button className='btn btn-primary ms-auto' onClick={(e) => this.getDashboard()}>Refresh</Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    
                </Card.Body>
            </Card>
        </div>
    )
};

export default HomeComponent;