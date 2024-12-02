import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function NewBoard() {
    const [title, setTitle] = useState(''); // State for board title
    const [description, setDescription] = useState(''); // State for description
    const [imageLink, setImageLink] = useState(''); // State for image link
    const [isPublic, setIsPublic] = useState(false); // State for public/private toggle
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate(); // For navigation

    const handleSave = async (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        setError(''); // Clear previous errors

        try {
            const userId = sessionStorage.getItem('user_id'); // Retrieve user ID from sessionStorage
            if (!userId) {
                setError('User not logged in.');
                return;
            }

            // Make API call to create a new wishboard
            const response = await axios.post('http://127.0.0.1:5000/wishlists', {
                user_id: userId,
                name: title,
                is_public: isPublic,
            });

            console.log(response.data.message); // Log success message
            navigate('/home'); // Redirect to Home after successful creation
        } catch (err) {
            console.error('Error creating board:', err);
            setError('An error occurred while creating the board.');
        }
    };

    return (
        <Container className="newPinContainer">
            <h1>Create a New Wishboard</h1>

            {/* Error message display */}
            {error && <p className="text-danger">{error}</p>}

            {/* Board Title */}
            <Form.Label className="form-required">Board Title</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon1"
                    required
                />
            </InputGroup>

            {/* Image Link */}
            <Form.Label htmlFor="basic-url">Image Link (optional)</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    id="basic-url"
                    aria-describedby="basic-addon3"
                />
            </InputGroup>

            {/* Description */}
            <Form.Label>Description (optional)</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    aria-label="With textarea"
                />
            </InputGroup>

            {/* Public/Private Toggle */}
            <Form.Label className="form-required">Select Board Preference</Form.Label>
            <InputGroup className="mb-3">
                <Form.Check
                    type="checkbox"
                    id="public-checkbox"
                    label="Public Board"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </InputGroup>

            {/* Buttons */}
            <Button onClick={handleSave} variant="primary">
                Save
            </Button>
            <Button onClick={() => navigate('/home')} variant="danger" className="m-3">
                Cancel
            </Button>
        </Container>
    );
}

export default NewBoard;
