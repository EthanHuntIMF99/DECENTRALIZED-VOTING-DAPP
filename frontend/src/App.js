import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ElectionBoard from './ElectionBoard';
import CandidateRegistration from './CandidateRegistration';
import './App.css';  

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ElectionBoard />} />
          <Route path="/register" element={<CandidateRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
