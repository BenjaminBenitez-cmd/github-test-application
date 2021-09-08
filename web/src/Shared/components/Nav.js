import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const bookmarks = useSelector((state) => state.bookmarks?.bookmarks);
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bookmarks">Bookmarks {bookmarks.length}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
