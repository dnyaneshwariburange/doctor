import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Usercss/card.css";
import ProductCard from "./ProductCard";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:7000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          name={product.title}
          review={product.review}
          desc={product.description}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default ProductContainer;
