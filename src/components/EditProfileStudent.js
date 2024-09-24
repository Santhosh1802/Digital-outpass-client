import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from 'react-bootstrap';

function EditProfileStudent({
  name, email, mobile, department, parentname, parentmobile, guardianname, guardianmobile,homeaddr,
  onNameChange, onEmailChange, onPhoneChange, onDepartmentChange,
  onParentNameChange, onParentMobileChange, onGuardianNameChange, onGuardianMobileChange,onHomeAddrChange
}) {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Container className="text-center" style={{ maxWidth: "500px", border: "2px solid black" }}>
        <h1 className='mt-5'>Update Profile</h1>
        <br />
        
        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>Name</InputGroup.Text>
          <Form.Control
            type='text'
            aria-label="Name"
            aria-describedby="inputGroup-sizing-default"
            placeholder='Enter your name'
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>Email ID</InputGroup.Text>
          <Form.Control
            type='email'
            aria-label="Email ID"
            aria-describedby="inputGroup-sizing-default"
            placeholder='Enter your email'
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>Phone Number</InputGroup.Text>
          <Form.Control
            type='number'
            aria-label="Phone Number"
            placeholder='Enter your phone number'
            value={mobile}
            onChange={(e) => onPhoneChange(e.target.value)}
            required
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>Department</InputGroup.Text>
          <Form.Control
            type='text'
            aria-label="Department"
            placeholder='Enter your department'
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            required
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>Parent Name</InputGroup.Text>
          <Form.Control
            type='text'
            aria-label="Parent Name"
            placeholder='Enter your parent name'
            value={parentname}
            onChange={(e) => onParentNameChange(e.target.value)}
            required
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>Parent Mobile</InputGroup.Text>
          <Form.Control
            type='number'
            aria-label="Parent Mobile"
            placeholder='Enter your parent phone number'
            value={parentmobile}
            onChange={(e) => onParentMobileChange(e.target.value)}
            required
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>Guardian Name</InputGroup.Text>
          <Form.Control
            type='text'
            aria-label="Guardian Name"
            placeholder='Enter your guardian name'
            value={guardianname}
            onChange={(e) => onGuardianNameChange(e.target.value)}
            required
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>Guardian Mobile</InputGroup.Text>
          <Form.Control
            type='number'
            aria-label="Guardian Mobile"
            placeholder='Enter your guardian phone number'
            value={guardianmobile}
            onChange={(e) => onGuardianMobileChange(e.target.value)}
            required
          />
        </InputGroup>
        <br />
        
        <InputGroup>
          <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>Home Address</InputGroup.Text>
          <Form.Control
            as='textarea'
            aria-label="Home Address"
            placeholder='Enter your home address'
            value={homeaddr}
            onChange={(e) => onHomeAddrChange(e.target.value)}
            required
          />
        </InputGroup>
        <br />

      </Container>
    </div>
  );
}

export default EditProfileStudent;
