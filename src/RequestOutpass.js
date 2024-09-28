import React, { useEffect, useState } from 'react';
import OutpassForm from './components/OutpassForm';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function RequestOutpass() {
  const location = useLocation();
  const { email } = location.state || {};
  
  const [userId, setUserId] = useState(null);

  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post(process.env.REACT_APP_POST_OUTPASS_API, data)
      .then((response) => {console.log(response)})
      .catch((error)=>{console.log(error.response.data.error[0])})
      

    } catch (error) {

      
      console.log('Error submitting outpass request:', error);
      
    }
  };

  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_GET_PROFILE_API}${email}`)
        .then((response) => response.json())
        .then((data) => {setUserId(data.id); console.log(data)})
        
        
        .catch((error) => console.error('Error fetching user ID:', error));
    }
  }, [email]);

  return (
    <div className='student text-center'>
      <h1>Request Outpass</h1>
      {/* {userId && <p>User ID: {userId}</p>} */}
      <OutpassForm userId={userId} onSubmit={handleFormSubmit} />
    </div>
  );
}

export default RequestOutpass;
