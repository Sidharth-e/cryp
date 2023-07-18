// Setting.js
import "./setting.scss";
import { useState } from "react";

export default function Setting() {
  const defaultCurrency = "inr";
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || defaultCurrency);

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const handleSetToDefault = () => {
    setCurrency(defaultCurrency);
    localStorage.setItem("currency", defaultCurrency);
  };
 console.log(currency)
  return (
    <>
      <div className="settings-container">
        <h1>Settings</h1>
        <div className="currency-select">
          <label>Select Market Currency:</label>
          <select
            className="select"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="inr">INR</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>
        <button className="default-btn" onClick={handleSetToDefault}>Set to Default</button>
      </div>
    </>
  );
}
