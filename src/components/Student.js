import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, InputGroup } from 'react-bootstrap';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_STUDENTS_API);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleUpdate = (student) => {
    alert(`Update functionality for ${student.name} is not implemented yet.`);
  };



  const handleSearch = async () => {
    try {
      let response;
      if (searchType === 'all') {
        response = await axios.get(process.env.REACT_APP_GET_STUDENTS_API);
      } else if (searchType === 'id') {
        response = await axios.get(`${process.env.REACT_APP_GET_STUDENT_BY_ID_API}${searchQuery}`)
      } else if (searchType === 'email') {
        response = await axios.get(`${process.env.REACT_APP_GET_STUDENT_BY_EMAIL_API}${searchQuery}`);
      } else if (searchType === 'department') {
        response = await axios.get(`${process.env.REACT_APP_GET_STUDENTS_BY_DEPARTMENT_API}${searchQuery}`);
      }
      if(searchType!=='id' && searchType!=='email'){
          setStudents(response.data);
      }
      else{
        setStudents([response.data]);
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className="pt-5 student p-5">
      <h2>Admin - Student Information</h2>

      <InputGroup className="mb-3">
        <Form.Select
          aria-label="Search Type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="all">Get All Students</option>
          <option value="id">Search by ID</option>
          <option value="email">Search by Email</option>
          <option value="department">Search by Department</option>
        </Form.Select>
        <Form.Control
          type="text"
          placeholder="Enter search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={searchType === 'all'}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students)?(
          students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(student)} className="me-2">
                  View
                </Button>
                <Button variant="warning" onClick={() => handleUpdate(student)} className="me-2">
                  Update
                </Button>
              </td>
            </tr>
          ))):(<tr><td>No Students available</td></tr>)}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <>
              <p><strong>ID:</strong> {selectedStudent.id}</p>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Department:</strong> {selectedStudent.department}</p>
              <p><strong>Phone:</strong> {selectedStudent.mobile}</p>
              <p><strong>Address:</strong> {selectedStudent.home_addr}</p>
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

export default Student;
