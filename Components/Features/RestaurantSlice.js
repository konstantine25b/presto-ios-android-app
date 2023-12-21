import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant:{
    Id: null,
    Title: null,
    MainImage:null,
    Address: null,
    Genre: null,
    ShortDescription:null,
    Rating: null,
    
  }
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant:(state,action)=>{
        state.restaurant = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions; // amit xdeba rom vicodet romeli restornidan vukvetavt

export const selectRestaurant = (state) => state.restaurant.restaurant;



export default restaurantSlice.reducer;
