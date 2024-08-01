import React, { useState } from "react";
import cakes from "../database/cakesDb";
import "../App.css";

const CakeSection = ({ addToBasket }) => {
  const [selectedCake, setSelectedCake] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderAdded, setOrderAdded] = useState(false);

  const handleItemClick = (cake) => {
    setSelectedCake(cake);
    setDescriptionVisible(true);
  };

  const handleCloseDescription = () => {
    setSelectedCake(null);
    setDescriptionVisible(false);
    setSelectedSize(null);
    setQuantity(1);
  };

  const handleOrder = () => {
    if (selectedCake && selectedSize && quantity > 0) {
      const price = selectedCake.price[selectedSize];
      addToBasket({ ...selectedCake, size: selectedSize, price, quantity });
      setOrderAdded(true);
      handleCloseDescription();
      setTimeout(() => {
        setOrderAdded(false);
      }, 2000);
    }
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
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
      <h2>Cakes</h2>
      <p>Indulge in our delightful cakes.</p>
      <div className="menu dessert-menu">
        {cakes.map((cake, index) => (
          <div
            key={index}
            className="item dessert-item"
            onClick={() => handleItemClick(cake)}
          >
            <img src={cake.image} alt={cake.name} />
            <div className="dessert-info">
              <h3>{cake.name}</h3>
              <button onClick={() => handleItemClick(cake)}>Order</button>
            </div>
          </div>
        ))}
      </div>
      {selectedCake && descriptionVisible && (
        <div className="description dessert-description">
          <div className="description-content">
            <h3>{selectedCake.name}</h3>
            <p>{selectedCake.description}</p>
            <div className="size-options">
              {selectedCake.sizes.map((size, index) => (
                <button
                  key={index}
                  className={selectedSize === size ? "selected" : ""}
                  onClick={() => handleSelectSize(size)}
                >
                  {size === "slice"
                    ? `Per Slice (${selectedCake.price.slice})`
                    : `Whole (${selectedCake.price.whole})`}
                </button>
              ))}
            </div>
            <div className="quantity-counter">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
                style={{ width: "50px", fontSize: "14px" }}
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

export default CakeSection;
