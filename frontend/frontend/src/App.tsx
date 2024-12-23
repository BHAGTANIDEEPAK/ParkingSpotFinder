import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import AddSpotForm from './components/AddSpotForm.tsx';
import ViewSpots from './components/ViewSpots.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import About from './pages/About.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddSpotForm />} />
          <Route path="/spots" element={<ViewSpots />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
