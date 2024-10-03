import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal} from 'react-bootstrap';

const Warden = () => {
  const [wardens, setWardens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarden, setSelectedWarden] = useState(null);

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

  return (
    <div className="student pt-5 p-5">
      <h2>Admin - Warden Information</h2>


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
          {wardens.map((warden) => (
            <tr key={warden.id}>
              <td>{warden.id}</td>
              <td>{warden.email}</td>
              <td>{warden.primary_number}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(warden)} className="me-2">
                  View
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
              <p><strong>Mobile:</strong> {selectedWarden.primary_number}</p>
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

export default Warden;
