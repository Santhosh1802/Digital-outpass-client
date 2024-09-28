import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './login';
import StudentDashboard from './StudentDashboard';
import WardenDashboard from './WardenDashboard';
import ManagementDashboard from './ManagementDashboard';
import SecurityDashboard from './SecurityDashboard';
import ForgotPass from './ForgotPass';
import SignUp from './SignUp';
import EditStudentProfile from './EditStudentProfile';
import ResetPassword from './ResetPassword';
import RequestOutpass from './RequestOutpass';
import FirstEditStudentProfile from './FirstEditStudentProfile';
import ViewRequestStudent from './ViewRequestStudent';
import ViewQR from './ViewQR';
import ScannerQRdemo from './ScannerQR';
import ViewHistoryWarden from './ViewHistoryWarden';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/forgotpassword" element={<ForgotPass/>}/>
          <Route path="/account/auth/reset/:token" element={<ResetPassword />}/>
          <Route path="/studentdashboard" element={<StudentDashboard/>}/>
          <Route path="/requestoutpass" element={<RequestOutpass/>}/>
          <Route path="/wardendashboard" element={<WardenDashboard/>}/>
          <Route path="/managementdashboard" element={<ManagementDashboard/>}/>
          <Route path="/securitydashboard" element={<SecurityDashboard/>}/>
          <Route path="/editstudentprofile" element={<EditStudentProfile/>}/>
          <Route path='/firsteditstudentprofile' element={<FirstEditStudentProfile/>}/>
          <Route path='/viewrequeststu' element={<ViewRequestStudent/>}/>
          <Route path='/viewqr' element={<ViewQR/>}/>
          <Route path='/scanqr' element={<ScannerQRdemo/>}/>
          <Route path='/wardenshowhist' element={<ViewHistoryWarden/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
