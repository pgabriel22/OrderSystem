import React from "react";
import "./Footer.css";

const Footer = () => {
  const version = "1.0.0";

  return (
    <footer className="app_footer">
      <p>
        © {new Date().getFullYear()} Y Kitchen | Version {version}
      </p>
    </footer>
  );
};

export default Footer;
