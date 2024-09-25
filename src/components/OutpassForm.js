import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const OutpassForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    purpose: '',
    inDateTime: '',
    outDateTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      department: '',
      purpose: '',
      inDateTime: '',
      outDateTime: '',
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-110 text-center">
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text className='equal-text1'>Name</InputGroup.Text>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text className='equal-text1'>Department</InputGroup.Text>
            <Form.Control
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text className='equal-text1'>Purpose</InputGroup.Text>
            <Form.Control
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text className='equal-text1'>Out Date & Time</InputGroup.Text>
            <Form.Control
              type="datetime-local"
              name="outDateTime"
              value={formData.outDateTime}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text className='equal-text1'>In Date & Time</InputGroup.Text>
            <Form.Control
              type="datetime-local"
              name="inDateTime"
              value={formData.inDateTime}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <br />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default OutpassForm;
