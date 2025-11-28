import { Routes, Route } from "react-router-dom";
import Landing from "./Landingpage/Landing.jsx";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import AttendanceHistory from "./Employee/AttendanceHistory";
import Signup from "./Authentication/Signup.jsx";
import EmployeeLeave from "./Employee/EmployeeLeave";
import ProfilePage from "./profile/profile";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="signup" element={<Signup />} />
      <Route path="employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="attendance-history" element={<AttendanceHistory />} />
      <Route path="leave" element={<EmployeeLeave />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  );
};

// This is the routing export
export default App;
