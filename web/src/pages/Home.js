import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../redux/Bookmark.slice";
import { updateQuery } from "../redux/Query.slice";
import { updateRepositories } from "../redux/Repository.slice";
import Card from "../Shared/components/Card";
import Layout from "../Shared/components/Layout";

const Home = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.query);
  const state = useSelector((state) => state.repositories);

  const handleChange = (e) => {
    dispatch(updateQuery(e.target.value));
  };

  const submit = () => {
    dispatch(updateRepositories());
  };

  useEffect(() => {
    if (query) return;
    dispatch(updateRepositories("React"));
    dispatch(getBookmarks());
  }, [dispatch, query]);

  return (
    <Layout>
      <div className="repo_input">
        <input type="text" value={query} onChange={handleChange} />
        <button onClick={submit}>Submit</button>
      </div>
      {state.loading ? (
        <div className="loading">Loading ... </div>
      ) : (
        <div>
          {state.repositories &&
            state.repositories.map((repo, index) => (
              <Card key={index} {...repo} buttonType="add" />
            ))}
        </div>
      )}
    </Layout>
  );
};

export default Home;
