import React, { useState } from "react";
import coffeeItems from "../database/coffeeDb";
import "../App.css";

const CoffeeSection = ({ addToBasket }) => {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderAdded, setOrderAdded] = useState(false); // State for order added notification

  const handleItemClick = (coffee) => {
    setSelectedCoffee(coffee);
    setDescriptionVisible(true);
  };

  const handleCloseDescription = () => {
    setSelectedCoffee(null);
    setDescriptionVisible(false);
    setQuantity(1);
  };

  const handleOrder = () => {
    if (selectedCoffee && quantity > 0) {
      addToBasket({ ...selectedCoffee, quantity });
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
      <h2>Coffee</h2>
      <p>Enjoy our finest coffee selections.</p>
      <div className="menu dessert-menu">
        {coffeeItems.map((coffee, index) => (
          <div
            key={index}
            className={`item dessert-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
            onClick={() => handleItemClick(coffee)}
          >
            <img
              src={coffee.image}
              alt={coffee.name}
              className="dessert-image"
            />
            <div className="dessert-info">
              <h3>{coffee.name}</h3>
              <p className="price">{coffee.price}</p>
              <button onClick={() => handleItemClick(coffee)}>Order</button>
            </div>
          </div>
        ))}
      </div>
      {selectedCoffee && descriptionVisible && (
        <div className="description dessert-description">
          <div className="description-content">
            <h3>{selectedCoffee.name}</h3>
            <p>{selectedCoffee.description}</p>
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

export default CoffeeSection;
