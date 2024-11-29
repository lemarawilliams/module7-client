import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function NewPin() {
    return (
        <Container className='newPinContainer'>

            <Form.Label className="form-required">Board Title</Form.Label>
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

            <Form.Label className="form-required">Select board preference</Form.Label>
            <InputGroup className="mb-3">
                <div className="mb-3">
                    <Form.Check // prettier-ignore
                        type='checkbox'
                        id={'default-checkbox'}
                        label={'Public Board'}
                    />
                </div>
                <div className='p-3'></div>
                <div className="mb-3">
                    <Form.Check // prettier-ignore
                        type='checkbox'
                        id={'default-checkbox'}
                        label={'Private Board'}
                    />
                </div>
            </InputGroup>

            <Button href="home" variant="primary">Save</Button>
            <Button href="home" variant="danger" className='m-3'>Cancel</Button>
        </Container>
    );
}

export default NewPin;