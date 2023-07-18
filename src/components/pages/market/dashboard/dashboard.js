import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Dashboard.scss';
import Loader from '../../../loader/loader';

function Marketdashboard({ searchvalue }) {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const currency = localStorage.getItem('currency');
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}&per_page=100`
        );
        setCoins(response.data);
        setLoading(false);
        scrollToTable(); // Scroll to the top of the table after updating coins
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoins();
  }, [currency, page]); // Include 'currency' and 'page' in the dependency array

  const scrollToTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Logo</th>
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
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td data-label="#">{coin.market_cap_rank}</td>
              <td data-label="Logo">
                <img className="image" src={coin.image} alt={coin.name} />
              </td>
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
      <button className="page-button" onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous Page
      </button>
      <button className="page-button" onClick={() => setPage(page + 1)}>
        Next Page
      </button>
    </div>
  );
}

export default Marketdashboard;
