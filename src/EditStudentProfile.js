import React, { useEffect, useState } from 'react';
import EditProfileStudent from './components/EditProfileStudent';
import Submit from './components/Submit';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function EditStudentProfile() {
  const location = useLocation();
  const { email } = location.state || {};
  const [message, setMessage] = useState("");
  const [error,setError]=useState("");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    parent_name: "",
    parent_mobile: "",
    guardian_name: "",
    guardian_mobile: "",
    home_addr: "",
    profile: "",
    id: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (email) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_GET_PROFILE_API}${email}`);
          //console.log(response.data.profile);
          
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
            profile: response.data.profile,
            id: response.data.id,
          });
        } catch (error) {
          console.log("Error fetching data", error);
          setError()
        }
      }
    };
    fetchProfileData();
  }, [email]);

  const handleProfileChange = (base64String) => {
    setProfileData({ ...profileData, profile: base64String.split(",")[1] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(profileData);
    try {
      const response = await axios.put(`${process.env.REACT_APP_UPDATE_PROFILE_API}${profileData.id}`, profileData);
      setMessage("Profile updated Successfully");
      setError(" ");
      console.log(response.data);
      
    } catch (error) {
      console.log("Error updating profile", error);
      setError(error.response.data[0]);
      console.log(error.response.data[0]);
      let data=error.response.data;
      for (const key in data) {
        if (Array.isArray(data[key])) {
          const valueAtIndexZero = data[key][0];
          console.log(`${key}: ${valueAtIndexZero}`);
          setError(valueAtIndexZero);
        }
      }
      
    }
  };

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
              parent_name={profileData.parent_name}
              parent_mobile={profileData.parent_mobile}
              guardian_name={profileData.guardian_name}
              guardian_mobile={profileData.guardian_mobile}
              home_addr={profileData.home_addr}
              profile={profileData.profile}
              onNameChange={(value) => setProfileData({ ...profileData, name: value })}
              onEmailChange={(value) => setProfileData({ ...profileData, email: value })}
              onPhoneChange={(value) => setProfileData({ ...profileData, mobile: value })}
              onDepartmentChange={(value) => setProfileData({ ...profileData, department: value })}
              onParentNameChange={(value) => setProfileData({ ...profileData, parent_name: value })}
              onParentMobileChange={(value) => setProfileData({ ...profileData, parent_mobile: value })}
              onGuardianNameChange={(value) => setProfileData({ ...profileData, guardian_name: value })}
              onGuardianMobileChange={(value) => setProfileData({ ...profileData, guardian_mobile: value })}
              onHomeAddrChange={(value) => setProfileData({ ...profileData, home_addr: value })}
              onProfileChange={handleProfileChange} 
            />
            <div className="text-center" style={{ background: "rgb(249, 237, 237)" }}>
              <p style={{color:'green'}}>{message}</p>
              <p style={{color:'red'}}>{error}</p>
              <Submit />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStudentProfile;
