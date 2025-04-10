import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
  const { name, image, cost } = action.payload;
  const existingItem = state.items.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.items.push({ name, image, cost, quantity: 1 });
  }
},
    removeItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem && existingItem.quantity>1) {
              existingItem.quantity-= 1;
            } else {
                state.items = state.items.filter(item => item.name !== action.payload);
            }
          },

          removeCartItem: (state, action) => {
            const idToRemove = action.payload.name;
            state.items = state.items.filter(item => item.name !== idToRemove);
          },
          
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          //itemToUpdate.quantity = quantity;
          itemToUpdate.quantity += 1;
        }
    
    },
  },
});

export const { addItem, removeItem, removeCartItem,  updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;