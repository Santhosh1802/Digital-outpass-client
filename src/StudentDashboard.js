/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import NavStudent from './components/NavStudent';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Loading from './components/Loading';
import { useNavigate } from 'react-router-dom';
const StudentDashboard = () => {
    const location=useLocation();
    const navigate = useNavigate();
    const {email,username} = location.state||{};
    const[userDetails,setUserDetails]=useState(null);
    const[error,setError]=useState("");
    useEffect(()=>{
        const fetchUserDetails=async()=>{
            try {
                await axios.get(process.env.REACT_APP_GET_PROFILE_API+email)
                .then(Response => {
                    setUserDetails(Response.data)
                    console.log(Response.data)

                })
                // console.log(res)
                // setUserDetails(res.data);
                // console.log(userDetails)
                // console.log("from res.data",res.data);
                console.log(email);
                
            } catch (err) {
                setError("Failed to fetch user detials");
                console.log(email);
                console.log(err);
                
                navigate("/firsteditstudentprofile",{state:{email,username}});
            }
        }
        if(email){
            fetchUserDetails();
        }
    },[email, navigate, username]);
    return (
        <div>
            <NavStudent email={email}/>
            <div className='student'>
                <h1 className='text-center pt-2'>Welcome Student!</h1>
                <Container className='text-center'>
                    <img src='profile.jpeg' className='profile'></img>
                    {error && <p>{error}</p>}
                    {userDetails ? (
                        <div>
                            <p><strong>Name:</strong> {userDetails.name}</p>
                            <p><strong>Email:</strong> {userDetails.email}</p>
                            <p><strong>Mobile:</strong> {userDetails.mobile || 'N/A'}</p>
                            <p><strong>Department:</strong> {userDetails.department || 'N/A'}</p>
                            <p><strong>Parent Name:</strong> {userDetails.parent_name || 'N/A'}</p>
                            <p><strong>Parent Mobile:</strong> {userDetails.parent_mobile || 'N/A'}</p>
                            <p><strong>Guardian Name:</strong> {userDetails.guardian_name || 'N/A'}</p>
                            <p><strong>Guardian Mobile:</strong> {userDetails.guardian_mobile || 'N/A'}</p>
                            <p><strong>Home Address:</strong> {userDetails.home_addr || 'N/A'}</p>
                        </div>
                    ):(
                        <div>
                            <Loading/>
                            <br></br>
                            <p>Loading user details</p>
                        </div>
                    )}

                </Container>

            </div>
        </div>
    );
}

export default StudentDashboard;
