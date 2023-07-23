import React from 'react';
import './App.css';
import { Navbar, Footer, NotFound } from './components';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
