import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function UserName({onNameChange}) {
    const[name,setName]=useState("");
    const[namevalidated,setNameValidated]=useState(false);
    const handleUserName=(e)=>{
        setName(e.target.value);
        onNameChange(e.target.value);
    }
    const handleBlur=()=>{
        setNameValidated(true);
    }
    return (
        <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default" className='equal-text'>
                User name
            </InputGroup.Text>
            <Form.Control
                type='text'
                aria-label="User name"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Enter your name"
                value={name}
                onChange={handleUserName}
                onBlur={handleBlur}
                isInvalid={namevalidated && !name}
                required
            />
            <Form.Control.Feedback type='invalid'>
                Please enter a valid.
            </Form.Control.Feedback>
        </InputGroup>
    );
}

export default UserName;
