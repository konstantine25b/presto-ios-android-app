import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './Features/BasketSlice'
import restaurantReducer from './Features/RestaurantSlice'

export const store = configureStore({
  reducer: {
    basket :basketReducer,
    restaurant : restaurantReducer,
  },
})