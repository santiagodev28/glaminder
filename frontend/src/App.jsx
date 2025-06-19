import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";


function App() {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        {/*<Route path="/admin" element={<AdminDashboard />} />
        <Route path="/propietario" element={<PropietarioDashboard />} />
        <Route path="/empleado" element={<EmpleadoDashboard />} />
        <Route path="/cliente" element={<ClienteDashboard />} />*/}
      </Routes>
    </Router>
  )
}

export default App
