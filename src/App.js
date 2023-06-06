import logo from './logo.svg';
import './App.css';
import Homepage from "./Components/Homepage"
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AddProperties from './Components/AddProperties';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <div className="App">
  <Navbar/>
  <Routes>
    <Route path='/home' element={<Homepage/>} />
    <Route path='/addproperties' element={<AddProperties/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
  </Routes>

    
    </div>
  );
}

export default App;
