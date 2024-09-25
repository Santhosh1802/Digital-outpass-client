import React from 'react'
import OutpassForm from './components/OutpassForm';

function RequestOutpass() {
    const handleFormSubmit = (data) => {
        console.log('Form submitted:', data);
      };
  return (
    <div className='student text-center'>
        <h1>Request Outpass</h1>
        <OutpassForm onSubmit={handleFormSubmit}/>
    </div>
  )
}

export default RequestOutpass;