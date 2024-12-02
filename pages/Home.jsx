import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Home() {
  const [wishboards, setWishboards] = useState([]); // State to store wishboards
  const [email, setEmail] = useState(''); // State to store user's email
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch the user's wishboards when the component loads
    const fetchWishboards = async () => {
      try {
        const userId = sessionStorage.getItem('user_id'); // Get user ID from session
        const storedEmail = sessionStorage.getItem('user_email'); // Get user email from session

        if (storedEmail) {
          setEmail(storedEmail); // Set email in state
        } else {
          setEmail(''); // Clear email if not found
        }

        if (userId) {
          // Fetch wishboards via API
          const response = await axios.get(`http://127.0.0.1:5000/api/users/${userId}/wishboards`);
          setWishboards(response.data); // Update state with fetched wishboards
        } else {
          setWishboards([]); // Clear wishboards if not logged in
        }
      } catch (error) {
        console.error('Error fetching wishboards:', error);
      }
    };

    fetchWishboards();
  }, [email]); // Re-run effect when email changes

  // Function to handle sign out
  const handleSignOut = () => {
    // Clear user data from sessionStorage
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_email');
    // Clear email state
    setEmail('');
    // Redirect to sign-in page
    navigate('/signin');
  };

  return (
    <div>
      {/* Sign In and Sign Up buttons */}
      {!email && (
        <div style={{ marginTop: '10px' }}>
          <Button variant="primary" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
          <Button variant="secondary" onClick={() => navigate('/signup')} className="ms-2">
            Sign Up
          </Button>
        </div>
      )}

      {/* Sign Out button when user is logged in */}
      {email && (
        <div style={{ marginTop: '10px' }}>
          <Button variant="danger" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      )}

      <h1 className="m-4">Your Wishboards</h1>

      {/* Display logged-in user's email */}
      {email && (
        <p>
          Welcome, <strong>{email}</strong>!
        </p>
      )}

      {/* Display wishboards */}
      <div>
        {wishboards.length > 0 ? (
          <ul>
            {wishboards.map((board) => (
              <li key={board.id}>
                <strong>{board.name}</strong> {board.is_public ? '(Public)' : '(Private)'}
              </li>
            ))}
          </ul>
        ) : (
          <p>You don’t have any wishboards yet.</p>
        )}
      </div>

      {/* Button to navigate to NewBoard */}
      {email && (
        <Button variant="success" onClick={() => navigate('/newboard')} className="mt-3">
          Create New Wishboard
        </Button>
      )}
    </div>
  );
}

export default Home;
