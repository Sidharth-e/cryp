import "./styl.scss";
import { useState, useEffect } from "react";
import { FaBars, FaBitcoin } from "react-icons/fa6";
import { BsFillFileEarmarkBarGraphFill,BsCurrencyExchange } from "react-icons/bs";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiFillSetting,
} from "react-icons/ai";
import Market from "../pages/market/market";
import Coins from "../pages/coins/coins";
import Settings from "../pages/settings/setting";
import Trade from '../pages/trade/trade';
import Logo from '../asset/logo.png'

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  // const [currency, setCurrency] = useState('inr');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [activePage, setActivePage] = useState("coins");
  const switchPage = (page) => {
    setActivePage(page);
  };
  // const handleCurrencyChange = (event) => {
  //   setCurrency(event.target.value);
  // };
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const searchButton = document.querySelector(
      "#content nav form .form-input button"
    );
    const searchButtonIcon = document.querySelector(
      "#content nav form .form-input button .bx"
    );
    const searchForm = document.querySelector("#content nav form");

    const handleSearchButtonClick = (e) => {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
          searchButtonIcon.classList.replace("bx-search", "bx-x");

          setShow("show");
        } else {
          searchButtonIcon.classList.replace("bx-x", "bx-search");

          setShow("");
        }
      }
    };

    searchButton.addEventListener("click", handleSearchButtonClick);

    if (window.innerWidth < 768) {
      sidebar.classList.add("hide");
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
      searchForm.classList.remove("show");
    }

    const handleResize = () => {
      if (window.innerWidth > 576) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
  searchButton.removeEventListener("click", handleSearchButtonClick);
  window.removeEventListener("resize", handleResize);
};
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <section id="sidebar" className={isSidebarOpen ? "hide" : ""}>
        <a href="/#" className="brand">
          <i className="bx">
            <img src={Logo} alt="logo" style={{width:30}}/>
          </i>
          <span className="text">CRYPIY</span>
        </a>
        <ul className="side-menu top">
        <li className={activePage === "coins" ? "active" : ""}>
            <a href="/#" onClick={() => switchPage("coins")}>
              <i className="bx">
                <FaBitcoin />
              </i>
              <span className="text">Coins</span>
            </a>
          </li>
          <li className={activePage === "market" ? "active" : ""}>
            <a href="/#" onClick={() => switchPage("market")}>
              <i className="bx bxs-dashboard">
                <BsFillFileEarmarkBarGraphFill size={20} />
              </i>
              <span className="text">Market</span>
            </a>
          </li>
          <li className={activePage === "trade" ? "active" : ""}>
            <a href="/#" onClick={() => switchPage("trade")}>
              <i className="bx">
                <BsCurrencyExchange />
              </i>
              <span className="text">Live Trade</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li className={activePage === "settings" ? "active" : ""}>
            <a href="/#" onClick={() => switchPage("settings")}>
              <i className="bx bxs-cog">
                <AiFillSetting />
              </i>
              <span className="text">Settings</span>
            </a>
          </li>
          {/* <li>
        <a>
          <i className='bx bxs-log-out-circle' ></i>
          <span className="text">Logout</span>
        </a>
      </li> */}
        </ul>
      </section>
      <section id="content">
        <nav>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <a href="/#" className=" nav-link">Categories</a>
          <form action="#">
            <div className="form-input">
              <input
                type="search"
                placeholder="Search..."
                onChange={handleSearch}
              />
              <button className="search-btn">
                <i className="bx">
                  {show ? <AiOutlineClose /> : <AiOutlineSearch />}
                </i>
              </button>
            </div>
          </form>

          {/* <div className="currency-select">
        <label>Select Currency:</label>
        <select className="select" value={currency} onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div> */}
          <input type="checkbox" id="switch-mode" hidden checked={darkMode} onChange={toggleDarkMode} />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          {/* <div className = "notification">
      <a href = "#">
      <div className = "notBtn">
        <span className="num">9</span>
        <i className='bx' ><AiFillBell/></i>
      </div>
        </a>
    </div>
    <a className="profile trigger">
      <RxAvatar size={20}/>
    </a> */}
        </nav>
        <main>
          {activePage === "market" && <Market searchvalue={search} />}
          {activePage === "coins" && <Coins searchvalue={search} />}
          {activePage === "settings" && <Settings />}
          {activePage==="trade" && <Trade/>}
        </main>
      </section>
    </>
  );
}
