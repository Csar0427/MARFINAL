import React, { useState } from "react";
import burgers from "../database/burgersDb";
import "../App.css";

const BurgerSection = ({ addToBasket }) => {
  const [selectedBurger, setSelectedBurger] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderAdded, setOrderAdded] = useState(false); // State for order added notification

  const handleItemClick = (burger) => {
    setSelectedBurger(burger);
    setDescriptionVisible(true);
  };

  const handleCloseDescription = () => {
    setSelectedBurger(null);
    setDescriptionVisible(false);
    setQuantity(1);
  };

  const handleOrder = () => {
    if (selectedBurger && quantity > 0) {
      addToBasket({ ...selectedBurger, quantity });
      setOrderAdded(true); // Set order added notification to true
      handleCloseDescription();
      setTimeout(() => {
        setOrderAdded(false); // Reset order added notification after 2 seconds
      }, 2000);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    if (value === "" || parsedValue >= 1) {
      setQuantity(value === "" ? "" : parsedValue);
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <div className="section dessert-section">
      <h2>Burgers and Sandwiches</h2>
      <p>Explore our delicious burgers.</p>
      <div className="menu dessert-menu">
        {burgers.map((burger, index) => (
          <div
            key={index}
            className={`item dessert-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
            onClick={() => handleItemClick(burger)}
          >
            <img
              src={burger.image}
              alt={burger.name}
              className="dessert-image"
            />
            <div className="dessert-info">
              <h3>{burger.name}</h3>
              <p className="price">{burger.price}</p>
              <button onClick={() => handleItemClick(burger)}>Order</button>
            </div>
          </div>
        ))}
      </div>
      {selectedBurger && descriptionVisible && (
        <div className="description dessert-description">
          <div className="description-content">
            <h3>{selectedBurger.name}</h3>
            <p>{selectedBurger.description}</p>
            <div className="quantity-counter">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
              />
            </div>
            <div className="button-group">
              <button className="close-button" onClick={handleCloseDescription}>
                Close
              </button>
              <button className="order-button" onClick={handleOrder}>
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
      {orderAdded && (
        <div className="order-notification">
          <p>Order added to basket!</p>
        </div>
      )}
    </div>
  );
};

export default BurgerSection;
