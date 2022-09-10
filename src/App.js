import React from "react";
import Weather from "./Weather";
import Footer from "./Footer";

import "./App.css";
import "./Footer.css";

export default function App() {
  return (
    <div className="App">
      <Weather defaultCity="Austin" />
      <Footer />
    </div>
  );
}
