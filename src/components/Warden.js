import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Warden = () => {
  const [wardens, setWardens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarden, setSelectedWarden] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWarden, setNewWarden] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    fetchWardens();
  }, []);

  const fetchWardens = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_WARDENS_API);
      setWardens(response.data);
    } catch (error) {
      console.error('Error fetching warden data:', error);
    }
  };

  const handleView = (warden) => {
    setSelectedWarden(warden);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleAddWardenChange = (e) => {
    const { name, value } = e.target;
    setNewWarden((prevWarden) => ({
      ...prevWarden,
      [name]: value,
    }));
  };


  const handleAddWardenSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_ADD_WARDEN_API, newWarden);
      alert('Warden added successfully');
      fetchWardens(); 
      handleCloseAddModal();
    } catch (error) {
      console.error('Error adding warden:', error);
    }
  };


  const handleDeleteWarden = async (wardenId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_DELETE_WARDEN_API}/${wardenId}`);
      alert('Warden deleted successfully');
      fetchWardens(); 
    } catch (error) {
      console.error('Error deleting warden:', error);
    }
  };

  return (
    <div className="student pt-5 p-5">
      <h2>Admin - Warden Information</h2>

      <div className="mb-3">
        <Button variant="success" onClick={handleShowAddModal}>
          Add Warden
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
          {wardens.map((warden) => (
            <tr key={warden.id}>
              <td>{warden.id}</td>
              <td>{warden.email}</td>
              <td>{warden.userType}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(warden)} className="me-2">
                  View
                </Button>
                <Button variant="danger" onClick={() => handleDeleteWarden(warden.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warden Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedWarden && (
            <>
              <p><strong>ID:</strong> {selectedWarden.id}</p>
              <p><strong>Email:</strong> {selectedWarden.email}</p>
              <p><strong>User Type:</strong> {selectedWarden.userType}</p>
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
          <Modal.Title>Add Warden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddWardenSubmit}>
            <Form.Group className="mb-3" controlId="formWardenEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter warden email"
                name="email"
                value={newWarden.email}
                onChange={handleAddWardenChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formWardenPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter warden password"
                name="password"
                value={newWarden.password}
                onChange={handleAddWardenChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Warden
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Warden;
