import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let newItems = [...state.items, action.payload].sort((a, b) => a.Title.localeCompare(b.Title));
      state.items = newItems; // am metodit vtovebt rac basketshi da vamatebt kide action.payloadit axal items
    },
    clearBasket: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
       state.items = []
    },

    removeFromBasket: (state, action) => {
      
      const index = state.items.findIndex(
        (item) => item.Id === action.payload.Id 
      ); // amit vpoulob tu item romlis amogebac gvinda basketshia
      let newBasket = [...state.items].sort((a, b) => a.Title.localeCompare(b.Title));

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `ver amoigeb imitoro ar ari shen basketshi es : ${action.payload.Id}`
        );
      }

      state.items = newBasket;
    },
   
  
  removeFromBasketWithIngredients: (state, action) => {

    function areEqual(array1, array2) {
      if (array1.length === array2.length) {
        return array1.every((element, index) => {
          if (element === array2[index]) {
            return true;
          }
    
          return false;
        });
      }
    
      return false;
    }
  
    const index = state.items.findIndex(
      (item) => item.Id === action.payload.Id && areEqual(item.unCheckedIngredients,action.payload.unCheckedIngredients)
    ); // amit vpoulob tu item romlis amogebac gvinda basketshia
    let newBasket = [...state.items].sort((a, b) => a.Title.localeCompare(b.Title));
   

    if (index >= 0) {
      newBasket.splice(index, 1);
    } else {
      console.warn(
        `ver amoigeb imitoro ar ari shen basketshi es : ${action.payload.Id}`
      );
    }

    state.items = newBasket;
  },
},
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket,removeFromBasketWithIngredients , clearBasket} = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, Id) =>
  state.basket.items.filter((item) => {
    
    return (item.Title === Id ); // aq item.Id ewera
  });
  export const selectBasketItemsWithIdAndIngredients = (state, Id, unCheckedIngredients) =>
  state.basket.items.filter((item) => {
    
    function areEqual(array1, array2) {
      if (array1.length === array2.length) {
        return array1.every((element, index) => {
          if (element === array2[index]) {
            return true;
          }
    
          return false;
        });
      }
    
      return false;
    }
    return (item.Id === Id && areEqual(item.unCheckedIngredients , unCheckedIngredients) );
  });

export const selectBasketTotal = (state) => {
  // console.log(state.basket.items)
  // console.log(1)
  
  // return state.basket.items.reduce(
  //   (total, item) => {
  //     total += item.Price;
  //     let basketTotal = parseFloat(total.toFixed(2));
  //     return basketTotal;
  //   },

    
  // );
  let total = 0;
  for(let i = 0 ; i<state.basket.items.length; i++){
   total+=Number(state.basket.items[i].Price);
   
  }
  let basketTotal= parseFloat(total.toFixed(2))
  return basketTotal
 
};

export default basketSlice.reducer;
