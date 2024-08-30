import React, { useContext } from "react";
import CartContext from "./cartContext";
import "../assets/Usercss/cart.css";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.product.image} alt={item.product.name} className="cart-img" />
                </td>
                <td>{item.product.name}</td>
                <td>₹ {item.product.price}</td>
                <td>{item.quantity}</td>
                <td>₹ {item.product.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartPage;
