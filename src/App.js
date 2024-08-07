import React, { useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BasketSection from "../src/pages/Basket";
import MainCourseSection from "../src/pages/MainCourseSection";
import DrinkSection from "../src/pages/DrinkSection";
import DessertSection from "../src/pages/DessertSection";
import BurgerSection from "../src/pages/BurgersSection";
import CakeSection from "../src/pages/CakeSection";
import CoffeeSection from "../src/pages/CoffeeSection"; // Import CoffeeSection
import Homepage from "../src/pages/Homepage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import {
  faUtensils,
  faBasketShopping,
  faCake,
  faGlassWater,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [generatedTicketNumber, setGeneratedTicketNumber] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addToBasket = (item) => {
    const updatedBasket = [...basketItems, item];
    setBasketItems(updatedBasket);
    console.log("Updated Basket Items:", updatedBasket);
  };

  const removeFromBasket = (index) => {
    const updatedBasket = [...basketItems];
    updatedBasket.splice(index, 1);
    setBasketItems(updatedBasket);
  };

  const handleReduceQuantity = (index) => {
    if (!orderPlaced) {
      const updatedBasketItems = [...basketItems];
      const updatedItem = { ...updatedBasketItems[index] };

      if (updatedItem.quantity > 0) {
        updatedItem.quantity -= 1;
        updatedBasketItems[index] = updatedItem;
        setBasketItems(updatedBasketItems); // Update the state with the updated basket items array
      }
    }
  };

  const addQuantity = (index, amount) => {
    const updatedBasket = [...basketItems];
    updatedBasket[index].quantity += amount;
    setBasketItems(updatedBasket);
  };

  const placeOrder = () => {
    const generatedTicketNumber = Math.floor(Math.random() * 1000000);
    setGeneratedTicketNumber(generatedTicketNumber);
    console.log("Placing order:", basketItems);
    setBasketItems([]);
  };

  const openNavbar = () => {
    setSidebarOpen(true);
  };

  return (
    <Router>
      <div className="app">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <div className={`hamburger ${sidebarOpen ? "active" : ""}`}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </button>

        <nav className={`navbar ${sidebarOpen ? "open" : ""}`}>
          <h2>
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "white" }}
            >
              <FontAwesomeIcon icon={faCoffee} style={{ marginRight: "8px" }} />
              Travel Mug Cafe
            </Link>
          </h2>
          <h3>best since 2018</h3>
          <div className="separator"></div>
          <h3>Menu</h3>
          <ul>
            <li>
              <Link
                to="/main-course"
                style={{ textDecoration: "none" }}
                onClick={() => setSidebarOpen(false)} // Close navbar on link click
              >
                <FontAwesomeIcon icon={faUtensils} /> Main Course
              </Link>
            </li>
            <li>
              <Link
                to="/drink"
                style={{ textDecoration: "none" }}
                onClick={() => setSidebarOpen(false)} // Close navbar on link click
              >
                <FontAwesomeIcon icon={faGlassWater} /> Drinks
              </Link>
            </li>
            <li>
              <Link
                to="/dessert"
                style={{ textDecoration: "none" }}
                onClick={() => setSidebarOpen(false)} // Close navbar on link click
              >
                <FontAwesomeIcon icon={faCake} /> Dessert
              </Link>
            </li>
            <li>
              <Link
                to="/burger"
                style={{ textDecoration: "none" }}
                onClick={() => setSidebarOpen(false)} // Close navbar on link click
              >
                <FontAwesomeIcon icon={faBurger} /> Burgers
              </Link>
            </li>
            <li>
              <Link
                to="/cake"
                style={{ textDecoration: "none" }}
                onClick={() => setSidebarOpen(false)} // Close navbar on link click
              >
                <FontAwesomeIcon icon={faCake} /> Cakes
              </Link>
            </li>
            <li>
              <Link
                to="/coffee"
                style={{ textDecoration: "none" }}
                onClick={() => setSidebarOpen(false)} // Close navbar on link click
              >
                <FontAwesomeIcon icon={faCoffee} /> Coffee
              </Link>
            </li>
          </ul>

          <h3>Order</h3>
          <ul>
            <li>
              {basketItems.length > 0 ? (
                <Link
                  to="/basket"
                  style={{ textDecoration: "none" }}
                  onClick={() => setSidebarOpen(false)} // Close navbar on link click
                >
                  <FontAwesomeIcon icon={faBasketShopping} /> Basket
                </Link>
              ) : (
                <span style={{ textDecoration: "none", cursor: "not-allowed" }}>
                  <FontAwesomeIcon icon={faBasketShopping} /> Basket
                </span>
              )}
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage onOpenNavbar={openNavbar} />} />
            <Route
              path="/main-course"
              element={<MainCourseSection addToBasket={addToBasket} />}
            />
            <Route
              path="/drink"
              element={<DrinkSection addToBasket={addToBasket} />}
            />
            <Route
              path="/dessert"
              element={<DessertSection addToBasket={addToBasket} />}
            />
            <Route
              path="/burger"
              element={<BurgerSection addToBasket={addToBasket} />} // Add BurgerSection route
            />
            <Route
              path="/cake"
              element={<CakeSection addToBasket={addToBasket} />} // Add CakeSection route
            />
            <Route
              path="/coffee"
              element={<CoffeeSection addToBasket={addToBasket} />} // Add CoffeeSection route
            />
            <Route
              path="/basket"
              element={
                basketItems.length > 0 ? (
                  <BasketSection
                    basketItems={basketItems}
                    onPlaceOrder={placeOrder}
                    onRemoveItem={removeFromBasket}
                    onReduceQuantity={handleReduceQuantity} // Pass handleReduceQuantity instead of reduceQuantity
                    addQuantity={addQuantity}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
