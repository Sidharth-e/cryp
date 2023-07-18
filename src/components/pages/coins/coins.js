import React, { useState, useEffect } from "react";
import "./coins.scss";
import Loader from "../../loader/loader";
import Heading from "../../heading/heading";

const CoinGrid = ( {searchvalue} ) => {
  console.log(searchvalue);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://min-api.cryptocompare.com/data/all/coinlist")
      .then((response) => response.json())
      .then((data) => {
        const coinData = Object.values(data.Data);
        setCoins(coinData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const filteredCoins = coins && Array.isArray(coins) ? coins.filter(
    (coin) => coin.FullName.toLowerCase().includes(searchvalue.toLowerCase())
  ) : [];

  return (
    <>
      <Heading name={"Crytpocoin"} />
      <div className="coin-grid">
        {isLoading || !coins ? (
          <Loader />
        ) : (
          <div className="card-grid">
            {filteredCoins.map((coin) => (
              <div className="card" key={coin.Id}>
                <img className="image" src={`https://www.cryptocompare.com${coin.ImageUrl}`} alt={coin.FullName} />
                <div className="card-header">
                  <h3>{coin.FullName}</h3>
                </div>
                <div className="card-body">
                  <p>Symbol: {coin.Symbol}</p>
                  <p>Algorithm: {coin.Algorithm}</p>
                  <p>SortOrder: {coin.SortOrder}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CoinGrid;
