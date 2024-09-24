import React, { useState } from 'react'
import UserIdPass from './components/UserIdPass';
import UserName from './components/UserName';
import { Form,Container } from 'react-bootstrap';
import SignUpButton from './components/SignUpButton.js';
import Logo from './components/Logo.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading.js';

function SignUp() {
  const [username,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const navigate=useNavigate();
  const handleUserName=(username)=>{
    setUserName(username);
  }
const handleEmailChange=(email)=>{
    setEmail(email);
}
const handlePasswordChange=(password)=>{
    setPassword(password);
}
const handleSubmit=async(e)=>{
  e.preventDefault();
  console.log(username,email,password);
  console.log(process.env.REACT_APP_SIGNUP_API);
  try{
    const res=await axios.post(process.env.REACT_APP_SIGNUP_API,
      {username,
      email,
      password},
      )
      setSuccess("Sign up successfull Redirecting to login page.");
      setError("");
    console.log(res.data);
    setTimeout(()=>{
      navigate("/");
    },3000);
  }
  catch(err){
    if(err.response && err.response.status === 409){
      setError("User already exists");
    }
    else{
      setError("Sign up failed");
    }
    console.log(err);
  }
}
  return (
    <div className='signup d-flex justify-content-center align-items-center min-vh-100'>
      <Container style={{maxWidth:"550px"}} className='text-center'>
        <Logo/>
        <h1 className='mt-5 h'>Student Sign Up</h1>
        <Form className='form mt-5 mb-5' onSubmit={handleSubmit}>
          <Form.Group>
            <UserName onNameChange={handleUserName}/>
            <br></br>
          </Form.Group>
          <Form.Group>
            <UserIdPass onEmailChange={handleEmailChange} onPasswordChange={handlePasswordChange}/>
          </Form.Group>
          <p className='linkssignup'><a href='/'>Login</a></p>
          <SignUpButton/>
          {error && <p>{error}</p>}
          {success && <p><br></br><Loading/><br></br>{success}</p>}
        </Form>
      </Container>
    </div>
  )
}
export default SignUp;