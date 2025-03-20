import React from "react";
import "./Footer.css"; // Optional for styling

const Footer = () => {
  const version = "1.0.0"; // Replace with your app version

  return (
    <footer className="app_footer">
      <p>
        © {new Date().getFullYear()} Y Kitchen | Version {version}
      </p>
    </footer>
  );
};

export default Footer;
