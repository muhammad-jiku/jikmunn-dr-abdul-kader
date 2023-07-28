import React from 'react';
import './App.css';
import { Navbar, Footer, NotFound } from './components';
import { Route, Routes } from 'react-router-dom';
import {
  HomePage,
  AboutPage,
  ServicesPage,
  PricesPage,
  ContactsPage,
  AuthPage,
} from './pages';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/prices' element={<PricesPage />} />
        <Route path='/contacts' element={<ContactsPage />} />
        <Route path='/signin' element={<AuthPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer position='bottom-right' />
      <Footer />
    </div>
  );
}

export default App;
