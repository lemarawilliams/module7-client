import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import ImgOverlayPin from './pin';

const styles = {
  card: {
    borderRadius: 55,
    // padding: '1rem',
    margin: 20
  },
  cardImage: {
    objectFit: 'cover',
    borderRadius: 55,
    // height: '50%',
    // width: '50%'
  }
}

function MyCard({ length }) {
  // Dictonary for pictures based on tag selected, if a tag was selected
  const categoryPics = {
    'clothes': 'https://picsum.photos/id/348/800/400',
    'electronics': 'https://picsum.photos/id/9/800/400',
    'experiences': 'https://picsum.photos/id/15/800/400',
    'home': 'https://picsum.photos/id/403/800/400',
    'game': 'https://picsum.photos/id/96/800/400',
    'food': 'https://picsum.photos/id/292/800/400'
  }

  // Temporary to see the pins; will be replaced by actually length
  length = 3;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Row xs={1} md={3} className="g-4">
        {Array.from({ length: length }).map((_, idx) => (
          <Col key={idx}>
            <Card style={styles.card}>
              {/* Replace from database */}
              <Card.Img variant="top" src="https://picsum.photos/800/400"
                style={styles.cardImage} />
              <Card.Body>
                <Card.Title>Card title</Card.Title> {/* Replace from database */}
                <Card.Text>
                  {/* Replace from database */}
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Card.Link href="editpin">Edit Pin</Card.Link>
                <Card.Link onClick={handleShow} >Delete Pin</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function MyPin({ length }) {
  return (
    <div>
      <MyCard length={length} />
    </div>
  );
}