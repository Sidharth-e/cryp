import Market from "../components/pages/market/market";
import Coin from "../components/pages/coins/coins";
import Settings from "../components/pages/settings/setting";
import Nav from "./navbar/Nav"
import {Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function Main() {
  return (
    <Router>
      <Suspense>
      <Routes>
      <Route path="/" element={<Nav />} />
        <Route path="/market" element={<Market />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/coins" element={<Coin/>} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
      </Suspense>
    </Router>
  );
}
