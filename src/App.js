import logo from './logo.svg';
import './App.css';
import Homepage from "./Components/Homepage"
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AddProperties from './Components/AddProperties';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Admin from './Components/Admin';
import UserProfile from './Components/UserProfile';
import Navigation from './Components/Navigation';

function App() {

  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");
    return accessToken && userRole;
  };
  // Function to check if the userRole in localStorage is "admin"
  const isAdmin = () => {
    const userRole = localStorage.getItem("userRole");
    return userRole === "admin";
  };

  return (
    <div className="App">
     {!isAuthenticated() && <Navbar />}
     {isAuthenticated() && <Navigation />}
  <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route path='/addproperties' element={<AddProperties/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/profile' element={<UserProfile/>}/>
  </Routes>

    
    </div>
  );
}

export default App;
