import { Routes, Route } from "react-router-dom";
import Landing from "./Landingpage/Landing.jsx";
import Signup from "./Authentication/signup.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

// This is the routing export
export default App;
