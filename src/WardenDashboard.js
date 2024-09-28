import React from 'react';
import WardenNav from './components/WardenNav';
import WardenCom from './components/WardenCom';
const WardenDashboard = () => {
    return (
        <div className='warden'>
            <WardenNav/>
            <h1 className='text-center pt-2'>Welcome Warden!</h1>
            <WardenCom/>
        </div>
    );
}

export default WardenDashboard;
