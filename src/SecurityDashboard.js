import React from 'react';
import SecurityNav from './components/SecurityNav';
import ScannerQR from './ScannerQR';
const SecurityDashboard = () => {
    return (
        <div>
            <SecurityNav/>
            <div className='security'>
                <h1>Welcome Security!</h1>
                <div className='Scanner'><ScannerQR/></div>
                
            </div>
        </div>
    );
}

export default SecurityDashboard;
