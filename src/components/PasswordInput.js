import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function PasswordInput({onPasswordChange,onCpasswordChange,error}) {
    const[password,setPassword]=useState("");
    const[cpassword,setCpassword]=useState("");
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
        onPasswordChange(e.target.value);
    }
    const handleCPasswordChange=(e)=>{
        setCpassword(e.target.value);
        onCpasswordChange(e.target.value);
    }
    return (
        <>
        <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>
                Password
            </InputGroup.Text>
            <Form.Control
                type='password'
                aria-label="Password"
                aria-describedby="inputGroup-sizing-default"
                placeholder='Enter your password'
                value={password}
                onChange={handlePasswordChange}
                isInvalid={!!error}
                required
            />
            <Form.Control.Feedback type='invalid'>
                Please enter your password.
            </Form.Control.Feedback>
        </InputGroup>
        <br/>
        <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default" className='equal-text1'>
                Confirm Password
            </InputGroup.Text>
            <Form.Control
                type='password'
                aria-label="Confirm Password"
                aria-describedby="inputGroup-sizing-default"
                placeholder='Re-enter your password'
                value={cpassword}
                onChange={handleCPasswordChange}
                isInvalid={!!error}
                required
            />
            <Form.Control.Feedback type='invalid'>
                Ensure both the password are same.
            </Form.Control.Feedback>
        </InputGroup>
        </>
    );
}

export default PasswordInput;
