import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

function SignIn() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // React Router navigation function

  // Function to handle sign-in
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(''); // Clear any previous errors

    try {
      // Make API call to backend
      const response = await axios.post('http://127.0.0.1:5000/api/signin', {
        email: email,
        password: password,
      });

      if (response.data.success) {
        // Store user info in sessionStorage
        sessionStorage.setItem('user_id', response.data.user_id);
        sessionStorage.setItem('user_email', email); // Store email in session

        // Redirect to the home page
        navigate('/home');
      } else {
        // Display error message from backend
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('An error occurred while signing in. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSignIn}>
      <Container className="signInContainer">
        {/* Display error message if any */}
        {error && <p className="text-danger">{error}</p>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email} // Bind input value to state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password} // Bind input value to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Sign In
        </Button>
        <Button
          className="m-3"
          variant="primary"
          onClick={() => navigate('/signup')} // Navigate to sign-up page
        >
          Sign Up
        </Button>
      </Container>
    </Form>
  );
}

export default SignIn;
