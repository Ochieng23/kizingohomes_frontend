import logo from './logo.svg';
import './App.css';
import Homepage from "./Components/Homepage"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
  <Routes>
    <Route path='/' element={<Homepage/>} />
    <Route/>
    <Route/>
    <Route/>
  </Routes>

    
    </div>
  );
}

export default App;
