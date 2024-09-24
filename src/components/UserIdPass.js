import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';

function UserIdPass({onEmailChange,onPasswordChange}) {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[emailvalidated,setEmailValidated]=useState(false);
    const[passwordvalidated,setPasswordValidated]=useState(false);
    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
        onEmailChange(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
        onPasswordChange(e.target.value);
    }
    const handleEmailBlur=()=>{
        setEmailValidated(true);
    }
    const handlePasswordBlur=()=>{
      setPasswordValidated(true);
  }
  return (
    <>
      <InputGroup>
        <InputGroup.Text id="inputGroup-sizing-default" className='equal-text'>
          Email ID
        </InputGroup.Text>
        <Form.Control
          type='email'
          aria-label="Email ID"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Enter your email'
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          isInvalid={emailvalidated && !email}
          required
        />
        <Form.Control.Feedback type='invalid'>
            Please enter a valid email.
        </Form.Control.Feedback>
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroup.Text id="inputGroup-sizing-default" className='equal-text'>
          Password
        </InputGroup.Text>
        <Form.Control
          type='password'
          aria-label="Password"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Enter your password'
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          isInvalid={passwordvalidated && !password}
          required
        />
        <Form.Control.Feedback type='invalid'>
            Please enter your password.
        </Form.Control.Feedback>
      </InputGroup>
      <br />
    </>
  );
}

export default UserIdPass;