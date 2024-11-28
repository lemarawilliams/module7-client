import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
  length = 3;
  return (
    <Row xs={1} md={3} className="g-4">
      {Array.from({ length: length }).map((_, idx) => (
        <Col key={idx}>
          <Card style={styles.card}>
            {/* Replace from database */}
            <Card.Img variant="top" src="https://picsum.photos/200"
              style={styles.cardImage} />
            <Card.Body>
              <Card.Title>Card title</Card.Title> {/* Replace from database */}
              <Card.Text>
                {/* Replace from database */}
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default function MyPin({ length }) {
  return (
    <div>
      <MyCard length={length} />
    </div>
  );
}