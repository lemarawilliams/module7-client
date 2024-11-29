import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Share() {
    return (
        <Container className='shareContainer'>

            <Form.Label className='form-required'>Select board</Form.Label>
            <InputGroup className="mb-3">
                <Form.Select aria-label="Default select example" className='boardSelect'>
                    <option>Select board</option>
                </Form.Select>
            </InputGroup>

            <Form.Label>Email address</Form.Label>
            <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="email" placeholder="name@example.com" />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text>Additional Text</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" placeholder='Hi! Someone wanted to share their wishlist with you!' />
            </InputGroup>


            <Button href="home" variant="success">Share</Button>
            <Button href="home" variant="danger" className='m-3'>Cancel</Button>
        </Container>
    );
}

export default Share;