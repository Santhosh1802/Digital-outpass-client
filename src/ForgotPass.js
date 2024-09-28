import React from 'react'
import { useState } from 'react';
import { Container,Form } from 'react-bootstrap';
import Logo from './components/Logo';
import EmailInput from './components/EmailInput';
import Submit from './components/Submit';
import axios from 'axios';

function ForgotPass() {
  const[email,setEmail]=useState("");
  const[message,setMessage]=useState("");
  const[error,setError]=useState("");
  const handleEmailChange=(email)=>{
    setEmail(email);
}
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(email);
    try {
        const res=await axios.post(process.env.REACT_APP_FORGOTPASS_API+email)
        setMessage("Reset Link Sent to your mail");
        setError('');
        console.log(res.data);
    } catch (error) {
        if(error.res && error.res.status===404){
          setError("Email not registered");
        }
        else{
          setError("Failed to send reset email");
        }
        console.log(error);
         
    }
  }
  return (
    <div className='forgot d-flex justify-content-center align-items-center min-vh-100'>
      <Container style={{maxWidth:"550px"}} className='text-center'>
        <Logo/>
        <h1 className='mt-5 h'>Forgot Password</h1>
        <Form className='form mt-5 mb-5' onSubmit={handleSubmit}>
          <Form.Group>
            <EmailInput onEmailChange={handleEmailChange}/>
          </Form.Group>
          <br></br>
          <Submit/>
          <br></br>
          <a href='/'>Login</a>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </Form>
      </Container>
    </div>
  )
}

export default ForgotPass;