import logo from './logo.svg';
import './App.css';
import Homepage from "./Components/Homepage"
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
  <Navbar/>
  <Routes>
    <Route path='/home' element={<Homepage/>} />
    <Route/>
    <Route/>
    <Route/>
  </Routes>

    
    </div>
  );
}

export default App;
