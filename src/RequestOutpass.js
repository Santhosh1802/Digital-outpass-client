import React, { useEffect, useState } from 'react';
import OutpassForm from './components/OutpassForm';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function RequestOutpass() {
  const location = useLocation();
  const { email } = location.state || {};
  
  const [userId, setUserId] = useState(null);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post(process.env.REACT_APP_POST_OUTPASS_API, data)
      .then((response) => {console.log(response.data);setMessage("Submitted Successfully!"); setError("");})
      .catch((error)=>{console.log(error.response.data.error[0]); setError("Error Submitting outpass");setMessage("")})
      console.log('Outpass request submitted successfully:', response.data);
      setMessage("Submitted Successfully!");
      setError("");
    } catch (err) {
      console.log(data);
      
      console.log('Error submitting outpass request:', err);
      
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
    <div className='student text-center pt-5'>
      <h1 className='pb-5'>Request Outpass</h1>
      <OutpassForm userId={userId} onSubmit={handleFormSubmit} />
      {<p style={{color:"red"}}>{error}</p>}
      {<p style={{color:"green"}}>{message}</p>}
    </div>
  );
}

export default RequestOutpass;
