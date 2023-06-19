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
import PropertiesList from './Components/PropertiesList'
import AddCs from './Components/AddCs';
import IndividualListing from './Components/IndividualListing';
import ManageProperties from './Components/ManageProperties';
import EditPropertyList from './Components/EditPropertyList';
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
    <div className="App bg-gray-100">
     {!isAuthenticated() && <Navbar />}
     {isAuthenticated() && <Navigation />}
  <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route path='/addproperties' element={<AddProperties/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/profile' element={<UserProfile/>}/>
    <Route path='/properties' element={<PropertiesList/>}/>
    <Route path='/addsite' element={<AddCs/>}/>
    <Route path="/listing/:id" element={<IndividualListing />} />
    <Route path="/manageproperties" element={<ManageProperties />} />
    <Route path="/editproperties" element={<EditPropertyList />} />


  </Routes>

    
    </div>
  );
}

export default App;
