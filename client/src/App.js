import React, { useEffect, useState } from 'react';
// external imports
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// internal imports
import './App.css';
import {
  Navbar,
  Footer,
  NotFound,
  RequiredAuth,
  RequiredAdmin,
} from './components';
import {
  HomePage,
  AboutPage,
  ServicesPage,
  ServicesDetailsInfoPage,
  PricesPage,
  ContactsPage,
  AuthPage,
  ForgetPasswordPage,
  ResetPasswordPage,
  BookingsPage,
  PaymentPage,
  SuccessPage,
  MyDashboardPage,
  MyProfilePage,
  UpdatePasswordPage,
  AppointmentsPage,
  NewServicePage,
  AllServicesPage,
  UpdateServicePage,
  NewPricePage,
  AllPricesPage,
  UpdatePricePage,
  AllUsersPage,
  UpdateUserPage,
  AllAppointmentsPage,
  UpdateAppointmentPage,
  AllTestimonialsPage,
} from './pages';
import { loadUser } from './actions/authActions';
import { appointmentStore } from './utils/store';
import { handleDisableRightClick } from './utils/disableRightClick';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

  const getStripeApiKey = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get('/api/v1/stripeapikey', config);
    setStripeApiKey(data?.stripeApiKey);
  };

  useEffect(() => {
    appointmentStore.dispatch(loadUser());
    getStripeApiKey();

    // disable right click
    document.addEventListener('contextmenu', handleDisableRightClick);

    // enable right click
    // document.removeEventListener('contextmenu', handleDisableRightClick);
  }, [stripeApiKey]);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/services/:title' element={<ServicesDetailsInfoPage />} />
        <Route path='/prices' element={<PricesPage />} />
        <Route path='/contacts' element={<ContactsPage />} />
        <Route path='/signin' element={<AuthPage />} />
        <Route path='/forget-password' element={<ForgetPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route
          path='/bookings'
          element={
            <RequiredAuth>
              <BookingsPage />
            </RequiredAuth>
          }
        />
        {stripeApiKey ? (
          <Route
            path='/payment'
            element={
              <RequiredAuth>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <PaymentPage />
                </Elements>
              </RequiredAuth>
            }
          />
        ) : null}
        <Route
          path='/success'
          element={
            <RequiredAuth>
              <SuccessPage />
            </RequiredAuth>
          }
        />
        <Route
          path='/dashboard'
          element={
            <RequiredAuth>
              <MyDashboardPage />
            </RequiredAuth>
          }
        >
          <Route
            index
            element={
              <RequiredAuth>
                <MyProfilePage />
              </RequiredAuth>
            }
          />
          <Route
            path='me/update-password'
            element={
              <RequiredAuth>
                <UpdatePasswordPage />
              </RequiredAuth>
            }
          />
          <Route
            path='me/appointments'
            element={
              <RequiredAuth>
                <AppointmentsPage />
              </RequiredAuth>
            }
          />
          <Route
            path='admin/new/service'
            element={
              <RequiredAdmin>
                <NewServicePage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/services'
            element={
              <RequiredAdmin>
                <AllServicesPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/service/:id'
            element={
              <RequiredAdmin>
                <UpdateServicePage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/new/price'
            element={
              <RequiredAdmin>
                <NewPricePage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/prices'
            element={
              <RequiredAdmin>
                <AllPricesPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/price/:id'
            element={
              <RequiredAdmin>
                <UpdatePricePage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/users'
            element={
              <RequiredAdmin>
                <AllUsersPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/user/:id'
            element={
              <RequiredAdmin>
                <UpdateUserPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/appointments'
            element={
              <RequiredAdmin>
                <AllAppointmentsPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/appointment/:id'
            element={
              <RequiredAdmin>
                <UpdateAppointmentPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/testimonials'
            element={
              <RequiredAdmin>
                <AllTestimonialsPage />
              </RequiredAdmin>
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
