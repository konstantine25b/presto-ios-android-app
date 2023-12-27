import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      let newItems = [...state.items, action.payload].sort((a, b) => a.Title.localeCompare(b.Title));
      state.items = newItems;
    },
    clearBasket: (state) => {
      state.items = [];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.Id === action.payload.Id);
      let newBasket = [...state.items].sort((a, b) => a.Title.localeCompare(b.Title));

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Item with Id ${action.payload.Id} not found in the basket.`);
      }

      state.items = newBasket;
    },
    removeFromBasketWithIngredients: (state, action) => {
      function areEqual(array1, array2) {
        if (array1.length === array2.length) {
          return array1.every((element, index) => element === array2[index]);
        }
        return false;
      }

      const index = state.items.findIndex(
        (item) =>
          item.Id === action.payload.Id &&
          areEqual(item.unCheckedIngredients, action.payload.unCheckedIngredients)
      );

      let newBasket = [...state.items].sort((a, b) => a.Title.localeCompare(b.Title));

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Item with Id ${action.payload.Id} and specified ingredients not found in the basket.`);
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket, removeFromBasketWithIngredients, clearBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = createSelector(
  [selectBasketItems, (_, Id) => Id],
  (items, Id) => items.filter((item) => item.Title === Id)
);

export const selectBasketItemsWithIdAndIngredients = createSelector(
  [selectBasketItems, (_, Id, unCheckedIngredients) => ({ Id, unCheckedIngredients })],
  (items, { Id, unCheckedIngredients }) =>
    items.filter((item) => item.Id === Id && areEqual(item.unCheckedIngredients, unCheckedIngredients))
);

export const selectBasketTotal = createSelector([selectBasketItems], (items) => {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += Number(items[i].Price);
  }
  return parseFloat(total.toFixed(2));
});

const areEqual = (array1, array2) => {
  if (array1.length === array2.length) {
    return array1.every((element, index) => element === array2[index]);
  }
  return false;
};

export default basketSlice.reducer;
