import React from 'react'
import { useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Logo from './components/Logo';
function ViewRequestStudent() {
    const location=useLocation();
    const {email} = location.state||{};
    const[userDetails,setUserDetails]=useState("");
    const[transaction,setTransaction]=useState("");
    useEffect(()=>{
        const fetchUserDetails=async()=>{
            try {
                await axios.get(process.env.REACT_APP_GET_PROFILE_API+email)
                .then(Response => {
                    setUserDetails(Response.data)
                    console.log(Response.data)
                })
                console.log(email);
                
            } catch (err) {
                console.log(email);
                console.log(err);
            }
        }
        if(email){
            fetchUserDetails();
        }
    },[email]);
    useEffect(()=>{
        const fetchTransDetails=async()=>{
            try {
                await axios.get(process.env.REACT_APP_GET_TRANS_API+userDetails.id)
                .then(Response => {
                    setTransaction(Response.data)
                    console.log(Response.data)
                })
                console.log(userDetails.id);
            } catch (err) {
                console.log(userDetails.id);
                console.log(err);
            }
        }
        if(userDetails.id){
            fetchTransDetails();
        }
    },[userDetails.id]);

  return (
    <>
    <div className='d-flex flex-column align-items-center min-vh-100'>
    <div className='mt-5'>
    <Logo/>
    </div>
    <h2 className='h mt-4'>Request Status</h2>
    <Container className="text-center" style={{maxWidth:"650px"}}>
    <Table striped bordered hover className='mt-2'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Out Time</th>
          <th>In Time</th>
          <th>Status</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{userDetails.t_id}</td>
          <td>{transaction.out_time}</td>
          <td>{transaction.in_time}</td>
          <td>{transaction.status}</td>
          <td>{transaction.reason}</td>
        </tr>
      </tbody>
    </Table>
    </Container>
    </div>
    </>
  )
}

export default ViewRequestStudent