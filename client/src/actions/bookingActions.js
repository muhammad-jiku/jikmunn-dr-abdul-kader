import axios from 'axios';
import { ADD_BOOKING_ITEM } from '../constants/bookingConstant';

export const addBookingItems =
  (appointmentData) => async (dispatch, getState) => {
    const { data } = await axios.get(
      `/api/v1/service/${appointmentData?.title}`
    );

    await dispatch({
      type: ADD_BOOKING_ITEM,
      payload: {
        service: data?.data?._id,
        image: data?.data?.serviceImg?.url,
        email: appointmentData?.email,
        fee: appointmentData?.fee,
        date: appointmentData?.date,
        meetingTime: appointmentData?.slotTime,
      },
    });

    localStorage.setItem(
      'bookingItems',
      JSON.stringify(getState().booking.bookingItems)
    );
  };
