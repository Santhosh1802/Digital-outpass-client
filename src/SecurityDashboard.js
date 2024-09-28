import React from 'react';
import SecurityNav from './components/SecurityNav';
import ScannerQR from './ScannerQR';
const SecurityDashboard = () => {
    return (
        <div className='warden'>
            <SecurityNav/>
            <div className='text-center'>
                <h1>Welcome Security!</h1>
                <ScannerQR/>
            </div>
        </div>
    );
}

export default SecurityDashboard;
