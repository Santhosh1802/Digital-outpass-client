import React from 'react';
import AdminNav from './components/AdminNav';
import ViewHistoryWarden from './ViewHistoryWarden';

function AdminDashboard() {
  return (
    <div className='student' style={{overflowX:'auto'}}>
    <AdminNav/>
    <ViewHistoryWarden/>
    </div>
  )
}

export default AdminDashboard