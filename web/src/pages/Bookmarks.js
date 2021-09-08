import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getBookmarks } from "../redux/Bookmark.slice";
import Card from "../Shared/components/Card";
import Layout from "../Shared/components/Layout";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);
  return (
    <Layout>
      <div className="div">
        {bookmarks &&
          bookmarks.map((item, index) => (
            <Card {...item} key={index} buttonType="remove" />
          ))}
        {bookmarks.length === 0 && (
          <div className="short_message">
            No bookmarks <Link to="/">add some </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookmarks;
