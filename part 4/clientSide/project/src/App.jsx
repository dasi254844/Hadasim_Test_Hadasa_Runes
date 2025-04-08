import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Navbar from './components/NavBar';
import { useState } from 'react';
import SignUp from './pages/SignUp';
import './app.css';


// Main application component
export default function App() {
  const [supplier, setSupplier] = useState();

  // Function to set the supplier when logged in
  function supplierIn(s) {
    setSupplier(s);
  }

  return (
    <div>
      {/* Navbar component */}
      <Navbar supplier={supplier}/>

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<Login setSupplier={supplierIn}/>} />  {/* Login page */}
        <Route path="/register" element={<SignUp setSupplier={supplierIn}/>} />  {/* Sign-up page */}
        <Route path="/orders" element={<Orders supplier={supplier}/>} />  {/* Orders page */}
      </Routes>
    </div>
  );
}

