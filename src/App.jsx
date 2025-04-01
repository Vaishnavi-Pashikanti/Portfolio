// App.js - Main component structure
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Terminal from './components/Terminal/Terminal';
import GitHubActivity from './components/GitHubActivity/GitHubActivity';
import AlgorithmicVisuals from './components/AlgorithmicVisuals/AlgorithmicVisuals';
import Navbar from './components/Navbar/Navbar';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved preference in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <BrowserRouter>
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="main-content">
          <div className="terminal-section">
            <Terminal darkMode={darkMode} />
          </div>
          
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} />} />
              <Route path="/projects" element={<Projects darkMode={darkMode} />} />
              <Route path="/about" element={<About darkMode={darkMode} />} />
              <Route path="/contact" element={<Contact darkMode={darkMode} />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Home component with algorithmic visuals and GitHub activity
function Home({ darkMode }) {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="algorithmic-background">
          <AlgorithmicVisuals darkMode={darkMode} />
        </div>
        <div className="hero-content">
          <h1>Vaishnavi Pashikanti</h1>
          <h2>A Computer Science Student</h2>
          <p>Building innovative solutions with clean, efficient code</p>
        </div>
      </div>
      
      <div className="github-section">
        <h2>My GitHub Activity</h2>
        <GitHubActivity username="Vaishnavi-Pashikanti" darkMode={darkMode} />
      </div>
      
      {/* <div className="featured-projects"> */}
        {/* <h2>Featured Projects</h2> */}
        {/* Featured projects grid here */}
      {/* </div> */}
    </div>
    
  );
}

export default App;