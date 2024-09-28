import React, { useState, useEffect,useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from './components/Logo';
import Loading from './components/Loading';

function ViewQR() {
    const location = useLocation();
    const { email } = location.state || {};
    const [userDetails, setUserDetails] = useState("");
    const [transaction, setTransaction] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_GET_PROFILE_API}${email}`);
                setUserDetails(response.data);
                console.log("User details fetched:", response.data);
            } catch (err) {
                console.error("Failed to fetch user details:", err);
            }
        };

        if (email) {
            fetchUserDetails();
        }
    }, [email]);

    const fetchTransDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_GET_TRANS_API}${userDetails.id}`);
            setTransaction(response.data);
            console.log("Transaction details fetched:", response.data);
        } catch (err) {
            console.error("Failed to fetch transaction details:", err);
        } finally {
            setLoading(false);
        }
    },[userDetails.id]);

    useEffect(() => {
        if (userDetails.id) {
            fetchTransDetails();
        }
    }, [userDetails.id,fetchTransDetails]);

    return (
        <div className='d-flex flex-column align-items-center min-vh-100'>
            <div className='mt-5'>
                <Logo/>
            </div>
            <h2 className='h mt-4'>View QR</h2>
            {transaction.qr && (
                <div>
                    <img 
                        src={`data:image/jpeg;base64,${transaction.qr}`} 
                        alt="QR Code"
                        style={{ width: '250px', height: '250px' }}
                    />
                </div>
            )}
            <button onClick={fetchTransDetails} disabled={loading}>
                {loading ? <Loading/> : 'Refresh QR Code'}
            </button>
        </div>
    );
}

export default ViewQR;
