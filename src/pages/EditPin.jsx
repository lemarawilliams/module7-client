import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function EditPin() {
    return (
        <Container className='editPinContainer'>

            <Form.Label className="form-required">What's your heart's desire?</Form.Label>
            <InputGroup className="mb-3">
                {/* <InputGroup.Text id="basic-addon1">Title</InputGroup.Text> */}
                <Form.Control
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>

            <Form.Label htmlFor="basic-url">Image Link (optional)</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control id="basic-url" aria-describedby="basic-addon3" />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text>Description (optional) </InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
            </InputGroup>

            <Form.Label>Select a tag for the pin (optional)</Form.Label>
            <InputGroup className="mb-3">
                <Form.Select aria-label="Default select example" className='filterTagSelect'>
                    <option>Select a tag</option>
                    <option value="1">Clothes</option>
                    <option value="2">Electronics</option>
                    <option value="3">Experiences</option>
                    <option value="3">Home</option>
                    <option value="3">Games</option>
                    <option value="3">Food</option>
                </Form.Select>
            </InputGroup>

            <Button href="home" variant="primary">Save</Button>
            <Button href="home" variant="danger" className='m-3'>Cancel</Button>
        </Container>
    );
}

export default EditPin;