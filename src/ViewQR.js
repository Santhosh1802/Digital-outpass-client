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
    const [qr,setQr]=useState("");
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
            console.log(userDetails.id);
            console.log(process.env.REACT_APP_GET_TRAN_ID)
            const response = await axios.get(process.env.REACT_APP_GET_TRAN_ID+userDetails.id)
            .then(response => {
                console.log(response); 
                console.log("from the get tran id")
                console.log(process.env.REACT_APP_GET_QR_CODE+response.data[0].t_id)
            
                const newres= axios.get(process.env.REACT_APP_GET_QR_CODE+response.data[0].t_id)
                .then(response => {console.log(response.data.QRcode);
                    setQr(response.data.QRcode);
                })
                .catch( (err)=> {console.log(err)})
            })
            .catch( (err)=> {console.log(err)})

            
            
            
            
            setTransaction(response.data.t_id);
            console.log("Transaction details fetched:", transaction);
        } catch (err) {
            console.error("Failed to fetch transaction details:", err);
        } finally {
            setLoading(false);
        }
    },[transaction, userDetails.id]);

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
            {qr && (
                <div>
                    <img 
                        src={`data:image/jpeg;base64,${qr}`} 
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
