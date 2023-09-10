import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {
  Navbar,
  Footer,
  NotFound,
  RequiredAuth,
  RequiredAdmin,
} from './components';
import { Route, Routes } from 'react-router-dom';
import {
  HomePage,
  AboutPage,
  ServicesPage,
  ServicesDetailsInfoPage,
  PricesPage,
  ContactsPage,
  AuthPage,
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
import { ToastContainer } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { loadUser } from './actions/authActions';
import { useSelector } from 'react-redux';
import { appointmentStore } from './utils/store';

function App() {
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state?.user
  );
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
  }, []);

  return (
    <div className='App'>
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/services' element={<ServicesPage />} />{' '}
        <Route
          path='/services/:title'
          element={
            // <RequiredAuth loading={loading} isAuthenticated={isAuthenticated}>
            <ServicesDetailsInfoPage />
            // </RequiredAuth>
          }
        />
        <Route path='/prices' element={<PricesPage />} />
        <Route path='/contacts' element={<ContactsPage />} />
        <Route path='/signin' element={<AuthPage />} />
        <Route
          path='/bookings'
          element={
            <RequiredAuth loading={loading} isAuthenticated={isAuthenticated}>
              <BookingsPage />
            </RequiredAuth>
          }
        />
        {stripeApiKey ? (
          <Route
            path='/payment'
            element={
              <RequiredAuth loading={loading} isAuthenticated={isAuthenticated}>
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
            <RequiredAuth loading={loading} isAuthenticated={isAuthenticated}>
              <SuccessPage />
            </RequiredAuth>
          }
        />
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
              <RequiredAuth loading={loading} isAuthenticated={isAuthenticated}>
                <UpdatePasswordPage />
              </RequiredAuth>
            }
          />
          <Route
            path='me/appointments'
            element={
              <RequiredAuth loading={loading} isAuthenticated={isAuthenticated}>
                <AppointmentsPage />
              </RequiredAuth>
            }
          />
          <Route
            path='admin/new/service'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <NewServicePage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/services'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <AllServicesPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/service/:id'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <UpdateServicePage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/new/price'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <NewPricePage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/prices'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <AllPricesPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/price/:id'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <UpdatePricePage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/users'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <AllUsersPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/user/:id'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <UpdateUserPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/appointments'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <AllAppointmentsPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/appointment/:id'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
                <UpdateAppointmentPage />
              </RequiredAdmin>
            }
          />
          <Route
            path='admin/reviews'
            element={
              <RequiredAdmin
                loading={loading}
                isAuthenticated={isAuthenticated}
                user={user}
              >
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
