import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
