import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

function NavigationBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary navbarContainer">
            <Navbar.Brand>My Wishlist</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="home" >Home</Nav.Link>
                    <Nav.Link href="newpin">Add New Pin</Nav.Link>
                    <Nav.Link href="newboard">Create New Board</Nav.Link>
                    <Form.Select aria-label="Default select example" className='filterTagSelect'>
                        <option>Filter for a tag</option>
                        <option value="1">Clothes</option>
                        <option value="2">Electronics</option>
                        <option value="3">Experiences</option>
                        <option value="3">Home</option>
                        <option value="3">Games</option>
                        <option value="3">Food</option>
                    </Form.Select>
                    <Nav.Link href="share">Share Wishlist</Nav.Link>
                    <hr />
                    <Nav.Link href="signin">Sign In/Sign Up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;