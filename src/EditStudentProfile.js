import React, { useEffect, useState } from 'react'
import EditProfileStudent from './components/EditProfileStudent';
import Submit from './components/Submit';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function EditStudentProfile() {
  const location=useLocation();
  const{email}=location.state||{};
  const[message,setMessage]=useState("");
  let id="";
  const[profileData,setProfileData]=useState({
    name:"",
    email:"",
    mobile:"",
    department:"",
    parent_name:"",
    parent_mobile:"",
    guardian_name:"",
    guardian_mobile:"",
    home_addr:"",
    id:"",
  });
  useEffect(()=>{
    const fetchProfileData=async()=>{
      // console.log(email);
      if(email){
      try{
        const response=await axios.get(process.env.REACT_APP_GET_PROFILE_API+email);
        setProfileData({
          name: response.data.name,
          email: response.data.email,
          mobile: response.data.mobile,
          department: response.data.department,
          parent_name: response.data.parent_name,
          parent_mobile: response.data.parent_mobile,
          guardian_name: response.data.guardian_name,
          guardian_mobile: response.data.guardian_mobile,
          home_addr: response.data.home_addr,
          id:response.data.id,
        });
        // console.log(response.data.id);
        
      }
      catch(error){
        console.log("Error fetching data",error);
      }
    }
    }
    fetchProfileData();
  },[email]);
  const handleNameChange=(value)=>
    setProfileData({...profileData,name:value});
  const handleEmailChange=(value)=>
    setProfileData({...profileData,email:value});
  const handlePhoneChange = (value) => 
    setProfileData({ ...profileData, mobile: value });
  const handleDepartmentChange = (value) => 
    setProfileData({ ...profileData, department: value });
  const handleParentNameChange = (value) => 
    setProfileData({ ...profileData, parent_name: value });
  const handleParentMobileChange = (value) => 
    setProfileData({ ...profileData, parent_mobile: value });
  const handleGuardianNameChange = (value) => 
    setProfileData({ ...profileData, guardian_name: value });
  const handleGuardianMobileChange = (value) => 
    setProfileData({ ...profileData, guardian_mobile: value });
  const handleHomeAddrChange=(value)=>
    setProfileData({...profileData,home_addr:value});

  const handleSubmit=async(event)=>{
    event.preventDefault();
    console.log("Submitting profile data:",profileData);
    
    try {
      const response=await axios.put(process.env.REACT_APP_UPDATE_PROFILE_API+profileData.id,profileData)
      .then()
      .catch(error=> {
        console.log(error)
      })
      console.log.apply('Profile updated Successfully',response.data);
      console.log(profileData.id);
      
      setMessage("Profile updated Successfully");
    } catch (error) {
      console.log("Error updating profile",error);
      console.log(profileData.id);
      
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" >
      <div style={{ maxWidth: '600px', width: '100%' }}>
    <div className='editstudentprofile'>
      <form onSubmit={handleSubmit}>
      <EditProfileStudent
        name={profileData.name}
        email={profileData.email}
        mobile={profileData.mobile}
        department={profileData.department}
        parent_name={profileData.parent_name}
        parent_mobile={profileData.parent_mobile}
        guardian_name={profileData.guardian_name}
        guardian_mobile={profileData.guardian_mobile}
        home_addr={profileData.home_addr}
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
      <div className="text-center" style={{background:"rgb(249, 237, 237)"}}>
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