import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const OutpassForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    purpose: '',
    inDate: '',
    inTime: '',
    outDateTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      inDate: formatDate(formData.inDate),
      outDate: formatDate(formData.outDate)
    };
    onSubmit(formattedData);
    setFormData({
      name: '',
      department: '',
      purpose: '',
      inDate: '',
      inTime: '',
      outDateTime: '',
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    console.log(date);
    
    return date.toISOString().split('T')[0];
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-110">
    <div style={{ maxWidth: '600px', width: '100%' }}>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDepartment">
        <Form.Label>Department</Form.Label>
        <Form.Control
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPurpose">
        <Form.Label>Purpose</Form.Label>
        <Form.Control
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formOutDateTime">
        <Form.Label>Out Date & Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="outDateTime"
          value={formData.outDateTime}
          onChange={handleChange}
          required
        />
      </Form.Group>


      <Form.Group controlId="formInDateTime">
        <Form.Label>In Date & Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="inDateTime"
          value={formData.inDateTime}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br></br>


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
  );
};

export default OutpassForm;
