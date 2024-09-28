import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const OutpassForm = ({ userId, onSubmit }) => {
  const [formData, setFormData] = useState({
    reason: '',
    in_time: '',
    out_time: '',
    hostel_id: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      in_time: formData.in_time,
      out_time: formData.out_time,
      reason: formData.reason,
      hostel_id: userId,
    };
    await onSubmit(dataToSubmit);
    setFormData({
      reason: '',
      in_time: '',
      out_time: '',
      hostel_id: userId,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-110 text-center">
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text className='equal-text1'>Reason</InputGroup.Text>
            <Form.Control
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text className='equal-text1'>Out Date & Time</InputGroup.Text>
            <Form.Control
              type="datetime-local"
              name="out_time"
              value={formData.out_time}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text className='equal-text1'>In Date & Time</InputGroup.Text>
            <Form.Control
              type="datetime-local"
              name="in_time"
              value={formData.in_time}
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
