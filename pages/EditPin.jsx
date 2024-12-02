import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function EditPin() {
  const { pinId } = useParams(); // Get pin ID from URL
  const [title, setTitle] = useState(''); // State for pin title
  const [description, setDescription] = useState(''); // State for description
  const [imageUrl, setImageUrl] = useState(''); // State for image URL
  const [selectedTag, setSelectedTag] = useState(''); // State for selected tag
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // For navigation

  // Map of tags to predetermined image URLs
  const tagImageMap = {
    Clothes: 'https://example.com/images/clothes.jpg',
    Electronics: 'https://example.com/images/electronics.jpg',
    Experiences: 'https://example.com/images/experiences.jpg',
    Home: 'https://example.com/images/home.jpg',
    Games: 'https://example.com/images/games.jpg',
    Food: 'https://example.com/images/food.jpg',
  };

  useEffect(() => {
    // Fetch the existing pin data when the component loads
    const fetchPinData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/wishlists/pin/${pinId}`);
        const pin = response.data;

        // Populate state with fetched data
        setTitle(pin.name);
        setDescription(pin.description);
        setImageUrl(pin.image_url || '');
        setSelectedTag(pin.category || '');
      } catch (err) {
        console.error('Error fetching pin data:', err);
        setError('An error occurred while fetching pin data.');
      }
    };

    fetchPinData();
  }, [pinId]);

  const handleTagChange = (e) => {
    const tag = e.target.value;
    setSelectedTag(tag); // Update selected tag
    setImageUrl(tagImageMap[tag] || ''); // Update image URL based on tag
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send updated pin data to the backend
      await axios.put(`http://localhost:5000/wishlists/pin/${pinId}`, {
        name: title,
        description: description,
        category: selectedTag,
        image_url: imageUrl,
      });

      navigate('/home'); // Redirect to Home after saving
    } catch (err) {
      console.error('Error saving pin:', err);
      setError('An error occurred while saving the pin.');
    }
  };

  return (
    <Container className="editPinContainer">
      <h1>Edit Pin</h1>

      {/* Error message display */}
      {error && <p className="text-danger">{error}</p>}

      {/* Pin Title */}
      <Form.Label className="form-required">What's your heart's desire?</Form.Label>
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
          id="basic-url"
          aria-describedby="basic-addon3"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)} // Allow manual override
        />
      </InputGroup>

      {/* Image Preview */}
      {imageUrl && (
        <div className="mb-3">
          <p>Image Preview:</p>
          <img src={imageUrl} alt="Selected Tag Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}

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

      {/* Tag Selection */}
      <Form.Label>Select a tag for the pin (optional)</Form.Label>
      <InputGroup className="mb-3">
        <Form.Select
          aria-label="Default select example"
          className="filterTagSelect"
          value={selectedTag}
          onChange={handleTagChange}
        >
          <option>Select a tag</option>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Experiences">Experiences</option>
          <option value="Home">Home</option>
          <option value="Games">Games</option>
          <option value="Food">Food</option>
        </Form.Select>
      </InputGroup>

      {/* Save and Cancel Buttons */}
      <Button onClick={handleSave} variant="primary">
        Save
      </Button>
      <Button onClick={() => navigate('/home')} variant="danger" className="m-3">
        Cancel
      </Button>
    </Container>
  );
}

export default EditPin;
