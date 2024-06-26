import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import ReportGeneration from './ReportGeneration';
import MapComponent from './MapComponent';
import NavbarComponent from './Navbar'; // Adjusted import path
import Help from './components/Help'; // Adjusted import path
import Footer from './Footer';
import './App.css';  // Ensure this is imported

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <div className="main-content">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/reportgeneration" element={<ReportGeneration />} />
            <Route path="/map" element={<MapComponent />} />
            <Route path="/help" element={<Help />} /> {/* Add route for Help */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      <Home />
      <Footer />
    </>
  );
}

export default App;
