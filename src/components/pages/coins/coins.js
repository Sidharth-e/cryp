import React, { useState, useEffect } from "react";
import "./coins.scss";
import Loader from "../../loader/loader";
import Heading from "../../heading/heading";
import { motion, AnimatePresence } from "framer-motion";

const CoinGrid = ({ searchvalue }) => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currency = localStorage.getItem("currency");

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=250`
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [currency]);

  const filteredCoins =
    coins && Array.isArray(coins)
      ? coins.filter((coin) =>
          coin.name.toLowerCase().includes(searchvalue.toLowerCase())
        )
      : [];
  return (
    <>
      <Heading name={"Cryptocoin"} />
      <div className="coin-grid">
        {isLoading || !coins ? (
          <Loader />
        ) : (
          <AnimatePresence>
            <motion.div className="card-grid">
              {filteredCoins.map((coin) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{
                    scale: 0.8,
                  }}
                  className="card"
                  key={coin.id}
                >
                  <img className="image" src={coin.image} alt={coin.name} />
                  <div className="card-header">
                    <h3>{coin.name}</h3>
                  </div>
                  <div className="card-body">
                    <p># Rank: {coin.market_cap_rank}</p>
                    <p>Symbol: {coin.symbol}</p>
                    <p>
                      Current Price: {coin.current_price} {currency}
                    </p>
                    <p>Market Cap: {coin.market_cap}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </>
  );
};

export default CoinGrid;
