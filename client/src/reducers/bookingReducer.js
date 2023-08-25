import {
  ADD_BOOKING_ITEM,
  REMOVE_BOOKING_ITEM,
} from '../constants/bookingConstant';

export const bookingReducer = (state = { bookingItems: [] }, action) => {
  switch (action.type) {
    case ADD_BOOKING_ITEM:
      const item = action.payload;

      const isItemExist = state.bookingItems.find(
        (i) => i.service === item.service
      );

      if (isItemExist) {
        return {
          ...state,
          bookingItems: state.bookingItems.map((i) =>
            i.service === isItemExist.service ? item : i
          ),
        };
      } else {
        return {
          ...state,
          bookingItems: [...state.bookingItems, item],
        };
      }

    case REMOVE_BOOKING_ITEM:
      return {
        ...state,
        bookingItems: state.bookingItems.filter(
          (i) => i.service !== action.payload
        ),
      };

    default:
      return state;
  }
};
