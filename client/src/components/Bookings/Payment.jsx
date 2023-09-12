import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  useStripe,
  useElements,
  // CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  addNewAppointment,
  clearErrors,
} from '../../actions/appointmentActions';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const feesInfo = JSON.parse(sessionStorage.getItem('bookingTotalFees'));

  const { user } = useSelector((state) => state?.user);
  const { loading, error, success } = useSelector(
    (state) => state?.newAppoinment
  );
  const { bookingItems } = useSelector((state) => state?.booking);

  const paymentData = {
    amount: Math.round(feesInfo?.totalFees),
  };
  console.log(feesInfo);

  const bookingInfo = {
    bookingItems,
    totalFees: feesInfo?.totalFees,
  };

  const {
    // register,
    formState: { isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    await e.preventDefault();
    console.log(data);

    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage?.getItem('token')}`,
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );

      const client_secret = await data?.client_secret;

      if (!stripe || !elements) return;

      // const card = elements.getElement(CardElement);
      const card = elements.getElement(CardNumberElement);

      const { error: paymentError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card,
        });

      if (card == null) {
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.username,
            email: user?.email,
            phone: user?.phone,
            address: {
              line1: user?.address,
              city: user?.city,
              state: user?.state,
              postal_code: Math.floor(1000 + Math.random() * 9000),
              country: user?.country,
            },
          },
        },
      });

      console.log(paymentMethod);
      if (result.error) {
        payBtn.current.disabled = false;
        console.log(result.error);
        console.log(paymentError);
        console.log(paymentMethod);

        toast.error('Something Went Wrong!');
        // toast.error(result.error);
        // toast.error(paymentError);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          bookingInfo.paymentInfo = {
            id: result?.paymentIntent?.id,
            status: result?.paymentIntent?.status,
          };

          await dispatch(addNewAppointment(bookingInfo));
          // reset();
          // toast.success('Payment Successfull!');
          // navigate('/success');
        } else {
          toast.error("There's some issue while processing payment!");
        }
      }
    } catch (err) {
      console.log(err.message);
      payBtn.current.disabled = false;

      // console.log(err.response.data.message);
      // toast.error(err.response.data.message);
      toast.error('Something Went Wrong!');
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && success) {
      localStorage?.removeItem('bookingItems');
      reset();
      toast.success(
        'Payment successfully done! Please go to your dashboard to join the meeting!'
      );
      navigate('/success');
    }
  }, [dispatch, isSubmitSuccessful, success, reset, navigate]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className='container mx-auto my-4 lg:my-10 p-2 min-h-[80vh] sm:min-h-screen'>
      <div className='container mx-auto my-10 p-2 flex flex-col items-center rounded-xl shadow-2xl w-11/12 lg:w-1/2'>
        <h2 className='text-3xl lg:text-5xl font-bold font-lobster text-main tracking-wider m-8'>
          Card Information
        </h2>
        <hr className='w-1/3 lg:w-1/4 mb-2 border-2 border-slate-300' />
        <form className='p-1 md:p-4 w-full' onSubmit={handleSubmit(onSubmit)}>
          {/* Card Number */}
          <div className='relative my-2 input input-bordered bg-white border-main text-xl'>
            <CardNumberElement className='absolute top-4 w-full' />
          </div>

          {/* Card Validition Date */}
          <div className='relative my-2 input input-bordered bg-white border-main text-xl'>
            <CardExpiryElement className='absolute top-4 w-full' />
          </div>

          {/* Card CVC Code */}
          <div className='relative my-2 input input-bordered bg-white border-main text-xl'>
            <CardCvcElement className='absolute top-4 w-full' />
          </div>

          <div className='form-control mt-6'>
            <input
              type='submit'
              className='btn bg-main text-white hover:bg-white hover:text-main hover:border-main uppercase'
              ref={payBtn}
              value={`Pay - $${feesInfo && feesInfo?.totalFees}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
