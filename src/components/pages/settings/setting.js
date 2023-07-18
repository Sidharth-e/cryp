// Setting.js
import "./setting.scss";
import { useState } from "react";

export default function Setting() {
  const defaultCurrency = "INR";
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
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <button className="default-btn" onClick={handleSetToDefault}>Set to Default</button>
      </div>
    </>
  );
}
