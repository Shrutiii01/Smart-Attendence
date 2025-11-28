import { Routes, Route } from "react-router-dom";
import Landing from "./Landingpage/Landing.jsx";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import Signup from "./Authentication/Signup.jsx";
import EmployeeLeave from "./Employee/EmployeeLeave";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="signup" element={<Signup />} />
      <Route path="employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="leave" element={<EmployeeLeave />} />
    </Routes>
  );
};

// This is the routing export
export default App;
