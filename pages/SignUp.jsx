import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

function SignUp() {
  const [username, setUsername] = useState(''); // State for username input
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error message
  const [success, setSuccess] = useState(''); // State for success message
  const navigate = useNavigate(); // React Router navigation function

  // Function to handle sign-up
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success message

    try {
      // Make API call to backend
      const response = await axios.post('http://127.0.0.1:5000/api/users', {
        username: username,
        email: email,
        password: password, // Backend handles hashing
      });

      if (response.status === 201) {
        setSuccess(response.data.message); // Display success message
        // Redirect to SignIn page after successful signup
        setTimeout(() => navigate('/signin'), 3000); // Redirect after 3 seconds
      } else {
        setError(response.data.message || 'Sign-up failed.');
      }
    } catch (err) {
      console.error('Sign-up error:', err);
      setError('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSignUp}>
      <Container className="signUpContainer">
        <h1>Sign Up</h1>

        {/* Display success or error messages */}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        {/* Username input */}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username} // Bind input value to state
            onChange={(e) => setUsername(e.target.value)} // Update state on change
            required
          />
        </Form.Group>

        {/* Email input */}
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

        {/* Password input */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password} // Bind input value to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            required
          />
        </Form.Group>

        {/* Sign Up Button */}
        <Button variant="success" type="submit">
          Sign Up
        </Button>
        <Button
          className="m-3"
          variant="secondary"
          onClick={() => navigate('/signin')} // Navigate back to sign-in page
        >
          Back to Sign In
        </Button>
      </Container>
    </Form>
  );
}

export default SignUp;
