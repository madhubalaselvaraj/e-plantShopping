import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, removeCartItem, updateQuantity } from './CartSlice';
import './CartItem.css';
//import { useState } from 'react';

//const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
const CartItem = ({ onContinueShopping, handleRemoveFromCart }) => {
    //const navigate = useNavigate();
    const cart = useSelector(state => state.cart?.items || []);
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});
  const [showProductList, setShowProductList] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
        const itemCost = parseFloat(item.cost.substring(1)); // Remove '$' and convert to float
        const itemQuantity = item.quantity || 0; // Default to 0 if quantity is missing
        return total + (itemCost * itemQuantity); // Add price * quantity of each item
      }, 0);
  };

  const handleContinueShopping = () => {
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity(item));
  };

  const handleDecrement = (item) => {
    dispatch(removeItem(item));
  };

  const handleRemove = (item) => {
    setAddedToCart.item;
    dispatch(removeCartItem(item));
    //handleRemoveFromCart(item);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => handleCheckoutShopping()}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


