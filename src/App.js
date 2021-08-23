import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Pokedex from "./components/pokedex/pokedex";
import GetPokemonId from "./components/pokemon-details/pokemon-details.js";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Pokedex} exact />
        <Route path="/pokemon/:num" component={GetPokemonId} exact />
      </Switch>
    </main>
  );
}
export default App;
