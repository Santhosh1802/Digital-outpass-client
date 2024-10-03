import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal} from 'react-bootstrap';

const Security = () => {
  const [securities, setSecurities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState(null);

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
  return (
    <div className="p-5 student">
      <h2>Admin - Security Information</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {securities.map((security) => (
            <tr key={security.id}>
              <td>{security.id}</td>
              <td>{security.email}</td>
              <td>{security.primary_number}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(security)} className="me-2">
                  View
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
              <p><strong>Mobile:</strong> {selectedSecurity.primary_number}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Security;
