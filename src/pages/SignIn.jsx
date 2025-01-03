import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

function SignIn() {
    return (
        <Form>
            <Container className='signInContainer'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button href="home" variant="success" type="submit">
                    Sign In
                </Button>
                <Button href="home" className="m-3" variant="primary" type="submit">
                    Sign Up
                </Button>
            </Container>
        </Form>
    );
}

export default SignIn;