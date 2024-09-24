import React, { useState } from 'react'
import { Container, Form} from 'react-bootstrap';
import Logo from './components/Logo';
import PasswordInput from './components/PasswordInput';
import Submit from './components/Submit';
import axios from 'axios';
function ResetPassword() {
    const [password,setPassword]=useState('');
    const [cpassword,setCpassword]=useState('');
    const[error,setError]=useState('');
    const handlePasswordChange=(password)=>{
        setPassword(password);
        setError('');
    }
    const handleCPasswordChange=(cpassword)=>{
        setCpassword(cpassword);
        setError('');
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(password,cpassword);
        if (password !== cpassword) {
            setError("Passwords do not match!");
            return;
        }
        try{
            const res=await axios.post(process.env.REACT_APP_RESETPASS_API,{
                password,
            })
            console.log(res.data);
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="text-center" style={{maxWidth:"550px"}}>
                <Logo/>
                <h1 className='mt-5 h'>Reset Password</h1>
                <Form className='form mt-5 mb-5' onSubmit={handleSubmit}>
                    <PasswordInput onPasswordChange={handlePasswordChange} onCpasswordChange={handleCPasswordChange} error={error}/>
                    <br/>
                    <Submit/>
                </Form>
            </Container>
        </div>
  )
}

export default ResetPassword;