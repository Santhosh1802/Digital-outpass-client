import React, { useState } from 'react';
import UserIdPass from './components/UserIdPass.js';
import { Container, Form} from 'react-bootstrap';
import LoginButton from './components/LoginButton.js';
import Logo from './components/Logo.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState("");
    const navigate = useNavigate();
    
    const handleEmailChange=(email)=>{
        setEmail(email);
    }
    const handlePasswordChange=(password)=>{
        setPassword(password);
    }
     const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(email,password);
        console.log(process.env.REACT_APP_LOGIN_API);
        try {
            const res=await axios.post(process.env.REACT_APP_LOGIN_API,{
                "email": email,
                "password": password
            })
            setError("");
            console.log(res.data);
            const user=res.data.user.user_type;
            if(user==='student'){
                navigate('/studentdashboard',{state:{email:res.data.user.email,username:res.data.user.username}});
            }
            else if(user==='warden'){
                navigate('/wardendashboard',{state:{email:res.data.email}});
            }
            else if(user==='security'){
                navigate('/securitydashboard',{state:{email:res.data.email}})
            }
            else if(user==='management'){
                navigate('/managementdashboard',{state:{email:res.data.email}});
            }
        } catch (err) {
            setError('Invalid email or password');
            console.log(err);
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="text-center" style={{maxWidth:"550px"}}>
               <Logo/>
                <h1 className='mt-5 h'>Login</h1>
                <Form className='form mt-5 mb-5' onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <UserIdPass onEmailChange={handleEmailChange} onPasswordChange={handlePasswordChange}/>
                    </Form.Group>
                    <p className='linkslogin'><a href='/forgotpassword' className='mb-3'>Forgot password ?</a>
                    <a href='/signup'>Sign up</a></p>
                    <LoginButton/>
                    {error && <p>{error}</p>}
                </Form>
            </Container>
        </div>
    );
}

export default Login;
