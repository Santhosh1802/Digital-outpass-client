import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Security = () => {
  const [securities, setSecurities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSecurity, setNewSecurity] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    fetchSecurities();
  }, []);

  const fetchSecurities = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_SECURITIES_API);
      setSecurities(response.data);
    } catch (error) {
      console.error('Error fetching security data:', error);
    }
  };

  const handleView = (security) => {
    setSelectedSecurity(security);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleAddSecurityChange = (e) => {
    const { name, value } = e.target;
    setNewSecurity((prevSecurity) => ({
      ...prevSecurity,
      [name]: value,
    }));
  };

  const handleAddSecuritySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_ADD_SECURITY_API, newSecurity);
      alert('Security added successfully');
      fetchSecurities();
      handleCloseAddModal();
    } catch (error) {
      console.error('Error adding security:', error);
    }
  };

  const handleDeleteSecurity = async (securityId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_DELETE_SECURITY_API}/${securityId}`);
      alert('Security deleted successfully');
      fetchSecurities();
    } catch (error) {
      console.error('Error deleting security:', error);
    }
  };

  return (
    <div className="p-5 student">
      <h2>Admin - Security Information</h2>

      <div className="mb-3">
        <Button variant="success" onClick={handleShowAddModal}>
          Add Security
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {securities.map((security) => (
            <tr key={security.id}>
              <td>{security.id}</td>
              <td>{security.email}</td>
              <td>{security.userType}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(security)} className="me-2">
                  View
                </Button>
                <Button variant="danger" onClick={() => handleDeleteSecurity(security.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Security Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSecurity && (
            <>
              <p><strong>ID:</strong> {selectedSecurity.id}</p>
              <p><strong>Email:</strong> {selectedSecurity.email}</p>
              <p><strong>User Type:</strong> {selectedSecurity.userType}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Security</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSecuritySubmit}>
            <Form.Group className="mb-3" controlId="formSecurityEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter security email"
                name="email"
                value={newSecurity.email}
                onChange={handleAddSecurityChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSecurityPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter security password"
                name="password"
                value={newSecurity.password}
                onChange={handleAddSecurityChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Security
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Security;
