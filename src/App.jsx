import React from "react";
import Home from "./components/home";
import Details from "./components/details";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "./css/media-queries.css";
const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:id" component={Details} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
