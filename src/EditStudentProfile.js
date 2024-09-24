import React, { useEffect, useState } from 'react'
import EditProfileStudent from './components/EditProfileStudent';
import Submit from './components/Submit';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function EditStudentProfile() {
  const location=useLocation();
  const{email,username}=location.state||{};
  const[message,setMessage]=useState("");
  const[profileData,setProfileData]=useState({
    name:"",
    email:"",
    mobile:"",
    department:"",
    parentname:"",
    parentmobile:"",
    guardianname:"",
    guardianmobile:"",
    homeaddr:""
  });
  useEffect(()=>{
    const fetchProfileData=async()=>{
      console.log(email);
      if(email){
      try{
        const response=await axios.get(process.env.REACT_APP_GET_PROFILE_API+email);
        setProfileData({
          name: response.data.user.name,
          email: response.data.user.email,
          mobile: response.data.profile.mobile,
          department: response.data.profile.department,
          parentname: response.data.profile.parentname,
          parentmobile: response.data.profile.parentmobile,
          guardianname: response.data.profile.guardianname,
          guardianmobile: response.data.profile.guardianmobile,
          homeaddr: response.data.profile.homeaddr
        });
      }
      catch(error){
        console.log("Error fetching data",error);
      }
    }
    }
    fetchProfileData();
  },[email]);
  const handleNameChange=(value)=>setProfileData({...profileData,name:value});
  const handleEmailChange=(value)=>setProfileData({...profileData,email:value});
  const handlePhoneChange = (value) => setProfileData({ ...profileData, mobile: value });
  const handleDepartmentChange = (value) => setProfileData({ ...profileData, department: value });
  const handleParentNameChange = (value) => setProfileData({ ...profileData, parentname: value });
  const handleParentMobileChange = (value) => setProfileData({ ...profileData, parentmobile: value });
  const handleGuardianNameChange = (value) => setProfileData({ ...profileData, guardianname: value });
  const handleGuardianMobileChange = (value) => setProfileData({ ...profileData, guardianmobile: value });
  const handleHomeAddrChange=(value)=>setProfileData({...profileData,homeaddr:value});

  const handleSubmit=async(event)=>{
    event.preventDefault();
    console.log("Submitting profile data:",profileData);
    
    try {
      const response=await axios.put(`${process.env.REACT_APP_UPDATE_PROFILE_API}?email=${email}`,profileData);
      console.log.apply('Profile updated Successfully',response.data);
      setMessage("Profile updated Successfully");
    } catch (error) {
      console.log("Error updating profile",error);
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div style={{ maxWidth: '600px', width: '100%' }}>
    <div className='editstudentprofile'>
      <form onSubmit={handleSubmit}>
      <EditProfileStudent
        name={profileData.name}
        email={profileData.email}
        mobile={profileData.mobile}
        department={profileData.department}
        parentname={profileData.parentname}
        parentmobile={profileData.parentmobile}
        guardianname={profileData.guardianname}
        guardianmobile={profileData.guardianmobile}
        homeaddr={profileData.homeaddr}
        onNameChange={handleNameChange}
        onEmailChange={handleEmailChange}
        onPhoneChange={handlePhoneChange}
        onDepartmentChange={handleDepartmentChange}
        onParentNameChange={handleParentNameChange}
        onParentMobileChange={handleParentMobileChange}
        onGuardianNameChange={handleGuardianNameChange}
        onGuardianMobileChange={handleGuardianMobileChange}
        onHomeAddrChange={handleHomeAddrChange}
      />
      <div className="text-center mb-4">
      {<p>{message}</p>}
      <br></br>
      <Submit/>
      <br></br>
      </div>
      </form>
    </div>
    </div>
    </div>
  )
}

export default EditStudentProfile