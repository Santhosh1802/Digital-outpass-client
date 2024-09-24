import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup  from 'react-bootstrap/InputGroup'
import { useState } from 'react';
function EmailInput({onEmailChange}) {
    const[email,setEmail]=useState("");
    const[emailvalidated,setEmailValidated]=useState(false);
    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
        onEmailChange(e.target.value);
    }
    const handleEmailBlur=()=>{
        setEmailValidated(true);
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
    </>
  )
}

export default EmailInput;