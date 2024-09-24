import { useState } from 'react';
import Form from 'react-bootstrap/Form';
function UserSelect({onUserTypeChange}) {
  const[userType,setUserType]=useState("");
  const[validated,setValidated]=useState(false);
  const handleChange=(e)=>{
    const selectedValue=e.target.value;
    setUserType(selectedValue);
    onUserTypeChange(selectedValue);
  }
  const handleValidation=()=>{
    setValidated(true);
  }
  return (
    <>
    <Form.Group controlId='userTypeSelect'>
    <Form.Select 
    aria-label="Select User Type" className='inputgroup' onChange={handleChange} value={userType} onBlur={handleValidation} isInvalid={validated && userType===""} required>
      <option value="">Select User Type</option>
      <option value="Student">Student</option>
      <option value="Warden">Warden</option>
      <option value="Security">Security</option>
      <option value="Management">Management</option>
    </Form.Select>
    <Form.Control.Feedback type='invalid'>
      Please select a valid user type.
    </Form.Control.Feedback>
    </Form.Group>
    <br/>
    </>
  );
}

export default UserSelect;