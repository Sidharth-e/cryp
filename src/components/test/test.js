import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './test.scss'
import Loader from './../loader/loader'

function Market({searchvalue}) {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  console.log(searchvalue)

  useEffect(() => {
    fetchCoins();
  }, [page]);

  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&page=${page}&per_page=100`
      );
      setCoins(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchvalue.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="search-container">
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope='col'>Logo</th>
            <th scope="col">Name</th>
            <th scope="col">Symbol</th>
            <th scope="col">Market cap</th>
            <th scope="col">Current price</th>
            <th scope="col">High 24h</th>
            <th scope="col">Low 24h</th>
            <th scope="col">Price change 24h</th>
            {/* Add more table headers for additional details */}
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td data-label="#">{coin.market_cap_rank}</td>
              <td data-label="Logo"><img className="image" src={coin.image} alt={coin.name} /> </td>
              <td data-label="Name">{coin.name}</td>
              <td data-label="Symbol">{coin.symbol}</td>
              <td data-label="Market cap">{coin.market_cap}</td>
              <td data-label="Current price">{coin.current_price}</td>
              <td data-label="High 24h">{coin.high_24h}</td>
              <td data-label="Low 24h">{coin.low_24h}</td>
              <td data-label="Price change 24h">{coin.price_change_24h}</td>
              {/* Add more table cells for additional details */}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className='page-button'
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button className='page-button' onClick={() => setPage(page + 1)}>
        Next Page
      </button>
    </div>
  );
}

export default Market;
