import React, { useState, useContext } from "react";
import "../assets/Usercss/card.css";
import CartContext from "./cartContext";

const ProductCard = ({ name, review, desc, price, image }) => {
  const [quantity, setQuantity] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const { addToCart } = useContext(CartContext);

  const incrementQtyHandler = () => {
    setQuantity(quantity + 1);
  };

  const decrementQtyHandler = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const displayDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAddToCart = () => {
    addToCart({ name, review, desc, price, image }, quantity);
  };

  return (
    <div className="card">
      <img src={image} alt="" className="card-img" />
      <h3>{name}</h3>
      <p>{review}</p>
      <p className="rs">₹ {price}</p>
      <button className="desc" onClick={displayDescription}>
        Description ▼
      </button>
      {showDescription && (
        <div className="description-content">
          <p>{desc}</p>
        </div>
      )}
      <div className="quantitySelector">
        <button onClick={decrementQtyHandler}>-</button>
        <p>{quantity}</p>
        <button onClick={incrementQtyHandler}>+</button>
      </div>
      <div className="card-button">
        <button className="buy">Buy</button>
        <button className="addCart" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
