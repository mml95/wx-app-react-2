import React from "react";
import "./Weather.css";
import "./Styles.css";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <footer>
        <a href="https://github.com/MMLaw95/wx-app-react" target="_blank">
          Open-source
        </a>
        <span className="by-footer">by</span>
        <a href="mailto:mlawry95@gmail.com">M.M. Lawry</a>
      </footer>
    </div>
  );
}
