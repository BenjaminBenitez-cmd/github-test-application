import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} render={(props) => <Home {...props} />} />
        <Route path="/bookmarks" render={(props) => <Bookmarks {...props} />} />
      </Switch>
    </Router>
  );
};

export default App;
