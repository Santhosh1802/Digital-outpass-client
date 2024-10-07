/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Loading from './components/Loading';
import Logo from './components/Logo';

function ViewHistoryWarden() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.REACT_APP_GET_ALL_TRANSACTION_API);
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

  return (
    <>
      <div className='d-flex flex-column align-items-center min-vh-100'>
        <div className='mt-5'>
          <Logo/>
        </div>
        <h2 className='m mt-4'>Student Outpass History</h2>
        <Container className="text-center" style={{ maxWidth: "850px" }}>
          {loading ? (
            <Loading/>
          ) : (
            <div style={{overflowX:'auto'}}>
            <Table striped bordered hover className='mt-2'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Out Time</th>
                  <th>In Time</th>
                  <th>Actual Out Time</th>
                  <th>Actual In Time</th>
                  <th>Status</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item) => (
                  <tr key={item.id}>
                    <td>{item.t_id}</td>
                    <td>{item.out_time}</td>
                    <td>{item.in_time}</td>
                    <td>{item.actual_out_time}</td>
                    <td>{item.actual_in_time}</td>
                    <td>{item.status}</td>
                    <td>{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default ViewHistoryWarden;
