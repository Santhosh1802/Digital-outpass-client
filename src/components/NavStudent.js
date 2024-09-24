import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

function NavStudent({email}) {
  return (
    <Navbar expand="md" className="studentnav">
      <Container className='studentnav'>
        <Navbar.Brand style={{ color: 'rgb(249, 237, 237)' }}>Digital Outpass System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/editstudentprofile" state={{email}} className='navlinks' style={{ color: 'rgb(249, 237, 237)' }}>Edit Profile</Nav.Link>
            <Nav.Link href="/requestoutpass" className='navlinks' style={{ color: 'rgb(249, 237, 237)' }}>Request Outpass</Nav.Link>
            <Nav.Link href='/' className='navlinks' style={{ color: 'rgb(249, 237, 237)' }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavStudent;