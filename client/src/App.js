import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, Footer, NotFound, RequiredAuth } from './components';
import { Route, Routes } from 'react-router-dom';
import {
  HomePage,
  AboutPage,
  ServicesPage,
  PricesPage,
  ContactsPage,
  AuthPage,
  MyDashboardPage,
  MyProfilePage,
  UpdatePasswordPage,
  NewServicePage,
  NewPricePage,
} from './pages';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './actions/authActions';
import { useSelector } from 'react-redux';
import { appointmentStore } from './utils/store';

function App() {
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state?.user
  );

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

  useEffect(() => {
    appointmentStore.dispatch(loadUser());
  }, []);

  return (
    <div className='App'>
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/prices' element={<PricesPage />} />
        <Route path='/contacts' element={<ContactsPage />} />
        <Route path='/signin' element={<AuthPage />} />
        <Route
          path='/dashboard'
          element={
            <RequiredAuth loading={loading} isAuthenticated={isAuthenticated}>
              <MyDashboardPage />
            </RequiredAuth>
          }
        >
          <Route
            index
            element={
              <RequiredAuth loading={loading} isAuthenticated={isAuthenticated}>
                <MyProfilePage />
              </RequiredAuth>
            }
          />
          <Route
            path='me/update-password'
            element={
              <RequiredAuth isAuthenticated={isAuthenticated}>
                <UpdatePasswordPage />
              </RequiredAuth>
            }
          />
          <Route
            path='admin/new/service'
            element={
              <RequiredAuth isAuthenticated={isAuthenticated}>
                <NewServicePage />
              </RequiredAuth>
            }
          />
          <Route
            path='admin/new/price'
            element={
              <RequiredAuth isAuthenticated={isAuthenticated}>
                <NewPricePage />
              </RequiredAuth>
            }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer position='bottom-right' />
      <Footer />
    </div>
  );
}

export default App;
