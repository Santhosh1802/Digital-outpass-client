import React, { useState } from 'react'
import { Container, Form} from 'react-bootstrap';
import PasswordInput from './components/PasswordInput';
import Submit from './components/Submit';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function ResetPassword() {
    const [password,setPassword]=useState('');
    const [confirm_password,setCpassword]=useState('');
    const [message,setMessage]=useState('');
    const[error,setError]=useState('');
    const {token}=useParams();
    console.log(token);
    
    const handlePasswordChange=(password)=>{
        setPassword(password);
        setError('');
    }
    const handleCPasswordChange=(confirm_password)=>{
        setCpassword(confirm_password);
        setError('');
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(password,confirm_password);
        if (password !== confirm_password) {
            setError("Passwords did not match!");
            return;
        }
        try{
            const res=await axios.post(process.env.REACT_APP_RESETPASS_API+token,{
                password,
                confirm_password,

            })
            console.log(res.data);
            setMessage("Password changed successfully!")
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="text-center" style={{maxWidth:"550px"}}>
                <h1 className='h'>Digital Outpass System</h1>
                <h1 className='mt-5 h'>Reset Password</h1>
                <Form className='form mt-5 mb-5' onSubmit={handleSubmit}>
                    <PasswordInput onPasswordChange={handlePasswordChange} onCpasswordChange={handleCPasswordChange} error={error}/>
                    <br/>
                    <Submit/>
                    {<p style={{color:"red"}}>{error}</p>}
                    {<p style={{color:"green"}}>{message}</p>}
                </Form>
            </Container>
        </div>
  )
}

export default ResetPassword;