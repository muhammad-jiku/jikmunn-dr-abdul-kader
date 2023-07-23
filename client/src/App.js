import React from 'react';
import './App.css';
import { Navbar, Footer } from './components';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Footer />
    </div>
  );
}

export default App;
