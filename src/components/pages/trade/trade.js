import React, { useEffect, useState } from "react";
import './trade.scss'
import Loader from "../../loader/loader";
import Heading from "../../heading/heading"
const CryptoPrice = () => {
  const [priceDetails, setPriceDetails] = useState(null);
  const [symbols, setSymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await fetch(
          "https://www.binance.com/api/v3/exchangeInfo"
        );
        const data = await response.json();
        const availableSymbols = data.symbols.map((symbol) => symbol.symbol);
        setSymbols(availableSymbols);
        setSelectedSymbol(availableSymbols[0]);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      }
    };

    fetchSymbols();
  }, []);

  useEffect(() => {
    if (selectedSymbol) {
      const socket = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedSymbol.toLowerCase()}@ticker`
      );

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setPriceDetails(data);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => {
        socket.close();
      };
    }
  }, [selectedSymbol]);

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
    setPriceDetails(null);
  };

  return (
    <div>
      <Heading name={"Live Trade"} />

      <select value={selectedSymbol} onChange={handleSymbolChange}>
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
      {priceDetails ? (
        <table>
          <thead>
            <tr>
              <th scope="col">Price</th>
              <th scope="col">Price change</th>
              <th scope="col">Price change percent</th>
              <th scope="col">Last quantity</th>
              <th scope="col">Best bid price</th>
              <th scope="col">Best bid quantity</th>
              <th scope="col">Best ask price</th>
              <th scope="col">Best ask quantity</th>
              <th scope="col">Open price</th>
              <th scope="col">High price</th>
              <th scope="col">Low price</th>
              <th scope="col">Total number of trades</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Price">{priceDetails.c}</td>
              <td data-label="Price change">{priceDetails.p}</td>
              <td data-label="Price change percent">{priceDetails.P}</td>
              <td data-label="Last quantity">{priceDetails.Q}</td>
              <td data-label="Best bid price">{priceDetails.b}</td>
              <td data-label="Best bid quantity">{priceDetails.B}</td>
              <td data-label="Best ask price">{priceDetails.a}</td>
              <td data-label="Best ask quantity">{priceDetails.A}</td>
              <td data-label="Open price">{priceDetails.o}</td>
              <td data-label="High price">{priceDetails.h}</td>
              <td data-label="Low price">{priceDetails.l}</td>
              <td data-label="Total number of trades">{priceDetails.n}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default CryptoPrice;
