// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeItem, updateQuantity } from './CartSlice';
// import './CartItem.css';

// const CartItem = ({ onContinueShopping }) => {
//   const cart = useSelector(state => state.cart.items);
//   const dispatch = useDispatch();

//   // Calculate total amount for all products in the cart
//   const calculateTotalAmount = () => {

//   };

//   const handleContinueShopping = (e) => {

//   };

//   const handleIncrement = (item) => {
//   };

//   const handleDecrement = (item) => {

//   };

//   const handleRemove = (item) => {
//   };

//   // Calculate total cost based on quantity for an item
//   const calculateTotalCost = (item) => {
//   };

//   return (
//     <div className="cart-container">
//       <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
//       <div>
//         {cart.map(item => (
//           <div className="cart-item" key={item.name}>
//             <img className="cart-item-image" src={item.image} alt={item.name} />
//             <div className="cart-item-details">
//               <div className="cart-item-name">{item.name}</div>
//               <div className="cart-item-cost">{item.cost}</div>
//               <div className="cart-item-quantity">
//                 <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
//                 <span className="cart-item-quantity-value">{item.quantity}</span>
//                 <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
//               </div>
//               <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
//               <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
//       <div className="continue_shopping_btn">
//         <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
//         <br />
//         <button className="get-started-button1">Checkout</button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = () => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{item.cost}</p>
        <div>
          <button onClick={handleDecrement}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <p>Subtotal: ${calculateTotalCost()}</p>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.cost.substring(1)) * item.quantity,
      0
    );
  };

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.name} item={item} />
      ))}
      <h2>Total: ${calculateTotalAmount()}</h2>
    </div>
  );
};

export default CartItems;
