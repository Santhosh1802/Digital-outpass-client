import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Container, Button, Modal } from 'react-bootstrap';
import Loading from './Loading';

function WardenCom() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.REACT_APP_GET_BY_STATUS_TRANSACTION_API+"pending");
      setDetails(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Failed to fetch transaction details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_UPDATE_TRANSACTION_STATUS_API}${id}/accepted`, {
        status: 'Accepted'
      });
      console.log(`Request with ID ${id} accepted`);
      fetchUserDetails();
    } catch (err) {
      console.error(`Failed to accept request with ID ${id}:`, err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_UPDATE_TRANSACTION_STATUS_API}${id}/rejected`, {
        status: 'Rejected'
      });
      console.log(`Request with ID ${id} rejected`);
      fetchUserDetails();
    } catch (err) {
      console.error(`Failed to reject request with ID ${id}:`, err);
    }
  };
  const handleViewStudent = async (studentId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GET_PROFILE_API_ID}${studentId}`);
      console.log(response.data)
      setSelectedStudent(response.data);
      setShowModal(true);
    } catch (err) {
      console.error(`Failed to fetch student details for ID ${studentId}:`, err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <h2 className='mt-4' style={{textAlign:"center"}}>Student Requests</h2>
        <Container className="text-center" style={{ maxWidth: "850px" }}>
          {loading ? (
            <Loading/>
          ) : (
            <Table striped bordered hover className='mt-2'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Out Time</th>
                  <th>In Time</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item) => (
                  <tr key={item.id}>
                    <td>{item.t_id}</td>
                    <td>{item.out_time}</td>
                    <td>{item.in_time}</td>
                    <td>{item.status}</td>
                    <td>{item.reason}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleViewStudent(item.hostel_id)}
                        className='m-1'
                      >
                        View Student
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleAccept(item.t_id)}
                        className='m-1'
                      >
                        Accept
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleReject(item.t_id)}
                        className='m-1'
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Student Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedStudent && (
              <>
                <img 
                  src={`data:image/jpeg;base64,${selectedStudent.profile}`} 
                  alt="Profile" 
                  className="img-fluid mb-3"
                  width={"200px"}
                  height={"200px"} 
                />
                <h5>Name: {selectedStudent.name}</h5>
                <p>Department: {selectedStudent.department}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default WardenCom;
