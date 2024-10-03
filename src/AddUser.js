import React, { useState } from 'react';
import UserIdPass from './components/UserIdPass';
import UserName from './components/UserName';
import { Form, Container,Button } from 'react-bootstrap';
import Logo from './components/Logo.js';
import axios from 'axios';
import Loading from './components/Loading.js';

function AddUser() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUserType] = useState('');
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password, user_type);
    console.log(process.env.REACT_APP_SIGNUP_API);
    try {
      const res = await axios.post(process.env.REACT_APP_SIGNUP_API, {
        username,
        email,
        password,
        user_type,
      });
      setSuccess('User created successfully.');
      setError('');
      console.log(res.data);
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
