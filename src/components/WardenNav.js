import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function WardenNav() {
  return (
    <Navbar expand="md" className="studentnav">
      <Container className='studentnav'>
        <Navbar.Brand style={{ color: 'rgb(249, 237, 237)' }}>Digital Outpass System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/wardenshowhist" className='navlinks' style={{ color: 'rgb(249, 237, 237)' }}>Show History</Nav.Link>
            <Nav.Link href="/" className='navlinks' style={{ color: 'rgb(249, 237, 237)' }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WardenNav;