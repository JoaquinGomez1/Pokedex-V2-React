import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import App from "./Components/Landing/App";
import PokemonDetails from "./Components/PokemonDetail/PokemonDetail";
import LastKnownContext from "./context/LastKnownUrl";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import TypesPage from "./Components/TypesPage/TypesPage";

export default function Routing() {
  return (
    <LastKnownContext>
      <Router>
        <Route path="/" component={Navbar} />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/pokemon/:name" component={PokemonDetails} />
          <Route path="/types/:typeName" component={TypesPage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </LastKnownContext>
  );
}
