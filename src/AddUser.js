import React, { useState } from 'react';
import UserIdPass from './components/UserIdPass';
import UserName from './components/UserName';
import { Form, Container, Button, InputGroup } from 'react-bootstrap';
import Logo from './components/Logo.js';
import axios from 'axios';
import Loading from './components/Loading.js';

function AddUser() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUserType] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [primaryNumber, setPrimaryNumber] = useState('');
  const [secondaryNumber, setSecondaryNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUserName = (username) => {
    setUserName(username);
  };
  const handleEmailChange = (email) => {
    setEmail(email);
  };
  const handlePasswordChange = (password) => {
    setPassword(password);
  };
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Remove the prefix
      setProfilePhoto(base64String);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password, user_type, profilePhoto, primaryNumber, secondaryNumber);
    
    try {
      const res = await axios.post(process.env.REACT_APP_SIGNUP_API, {
        username,
        email,
        password,
        user_type,
      });
      setSuccess('User created successfully.');
      setError('');
      console.log("Data",res.data);
      
      if (user_type === 'Warden' || user_type === 'Security') {
        const specificApi = user_type === 'Warden' 
          ? process.env.REACT_APP_WARDEN_API 
          : process.env.REACT_APP_SECURITY_API;

        await axios.post(specificApi, {
          profile:profilePhoto,
          primary_number:primaryNumber,
          secondary_number:secondaryNumber,
          email,
          username,
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('User already exists');
      } else {
        setError('Failed to add user');
      }
      console.log(err);
    }
  };

  return (
    <div className='signup d-flex justify-content-center align-items-center min-vh-100'>
      <Container style={{ maxWidth: '550px' }} className='text-center'>
        <Logo />
        <h1 className='mt-5 h'>Add New User</h1>
        <Form className='form mt-5 mb-5' onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Select User Type</Form.Label>
            <Form.Control as='select' value={user_type} onChange={handleUserTypeChange}>
              <option value='Student'>Student</option>
              <option value='Warden'>Warden</option>
              <option value='Security'>Security</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <UserName onNameChange={handleUserName} />
            <br />
          </Form.Group>
          <Form.Group>
            <UserIdPass onEmailChange={handleEmailChange} onPasswordChange={handlePasswordChange} />
          </Form.Group>

          {(user_type === 'Warden' || user_type === 'Security') && (
  <>
    <Form.Group className='form-field'>
      <Form.Label>Upload Profile Photo</Form.Label>
      <Form.Control
        type='file'
        accept='image/*'
        onChange={handleProfilePhotoChange}
        className='custom-file-input'
      />
    </Form.Group>

    <InputGroup className='form-field custom-input-group'>
      <InputGroup.Text id="inputGroup-sizing-default" className='equal-text'>
        Primary Number
      </InputGroup.Text>
      <Form.Control
        placeholder='Enter your Primary number'
        aria-describedby="inputGroup-sizing-default"
        type='tel'
        value={primaryNumber}
        onChange={(e) => setPrimaryNumber(e.target.value)}
        required
      />
    </InputGroup>

    <InputGroup className='form-field custom-input-group'>
      <InputGroup.Text id="inputGroup-sizing-default" className='equal-text'>
        Secondary Number
      </InputGroup.Text>
      <Form.Control
        placeholder='Enter your Secondary number'
        aria-describedby="inputGroup-sizing-default"
        type='tel'
        value={secondaryNumber}
        onChange={(e) => setSecondaryNumber(e.target.value)}
      />
    </InputGroup>
  </>
)}
          <Button variant="primary" type='submit'>Add User</Button>
          {error && <p className='text-danger'>{error}</p>}
          {success && (
            <p className='text-success'>
              <br />
              <Loading />
              <br />
              {success}
            </p>
          )}
        </Form>
      </Container>
    </div>
  );
}

export default AddUser;
