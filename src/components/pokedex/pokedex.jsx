import React, { Component } from "react";
import "./pokedex.scss";
import PokemonCard from "../pokemon-card/pokemon-card";
import SearchBar from "../search/search";
import Multiselect from "multiselect-react-dropdown";

class Pokedex extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      filters: {},
      options: [
        { name: "Option 1️⃣", id: 1 },
        { name: "Option 2️⃣", id: 2 },
      ],
      selectedTypes: [],
    };
  }
  multiFilters = ["type", "weaknesses"];
  selected;

  componentDidMount() {
    this.getPokemons();
    this.getPokemonTypes();
  }

  /*
   * Gets a list of all Pokemon and saves it on state
   */
  getPokemons() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      this.setState({ pokemons: JSON.parse(xhr.responseText) });
      console.log(this.state.pokemons);
    });
    xhr.open("GET", `/pokemons${this.parseQueryParams()}`);
    xhr.send();
  }

  /*
  * Get Pokemon Types and saves it on state
  */
  getPokemonTypes() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      this.setState({
        pokemonTypes: JSON.parse(xhr.responseText).map((type) => {
          return { name: type, id: type };
        }),
      });
    });
    xhr.open("GET", `/pokemon/types`);
    xhr.send();
  }

  /*
  * Returns query params depending on filters saved in state 
  * Uses format ?param1=value
  */
  parseQueryParams() {
    const filters = Object.keys(this.state.filters);
    let queryParams = "";
    if (filters.length > 0) {
      queryParams = "?";
      filters.forEach((filter, index) => {
        if (this.state.filters[filter] !== "") {
          queryParams +=
            (index > 0 ? "&" : "") + `${filter}=${this.state.filters[filter]}`;
        }
      });
    }
    return queryParams;
  }

  /** 
   * Updates filters saved on state and refreshes the Pokemon list 
  */

  handleFilterUpdate = (filter, value) => {
    const savedFilters = this.state.filters ? this.state.filters : {};
    if (Array.isArray(value) && this.multiFilters.includes(filter)) {
      savedFilters[filter] = `${value.join(",")}`;
    } else {
      savedFilters[filter] = `${value}`;
    }
    this.setState({ filters: savedFilters });
    this.getPokemons();
  };

  
  /**
   * Handels select event on multi select
   */
  onSelectType = (selectedList, selectedItem) => {
    this.handleFilterUpdate(
      "type",
      selectedList.map((type) => type.name)
    );
  };

  /**
   * Handels remove event on multi select
   */
  onRemoveType = (selectedList, selectedItem) => {
    this.handleFilterUpdate(
      "type",
      selectedList.map((type) => type.name)
    );
  };

  /**
   * Handels select event on multi select
   */
  onSelectWeaknesses = (selectedList, selectedItem) => {
    this.handleFilterUpdate(
      "weaknesses",
      selectedList.map((type) => type.name)
    );
  };

  /**
   * Handels select event on multi select
   */
  onRemoveWeaknesses = (selectedList, selectedItem) => {
    this.handleFilterUpdate(
      "weaknesses",
      selectedList.map((type) => type.name)
    );
  };

  render() {
    return (
      <div className="pokedex">
        <div className="filters row">
          <div className="col-md-4">
            <h6>Search Name</h6>
            <SearchBar onFilterUpdate={this.handleFilterUpdate} />
          </div>
          <div className="col-md-4">
            <h6>Type</h6>
            <Multiselect
              options={this.state.pokemonTypes}
              selectedValues={this.state.selectedTypes}
              onSelect={this.onSelectType}
              onRemove={this.onRemoveType}
              displayValue="name"
              id="type"
            />
          </div>
          <div className="col-md-4">
            <h6>Weaknesses</h6>
            <Multiselect
              options={this.state.pokemonTypes}
              selectedValues={this.state.selectedTypes}
              onSelect={this.onSelectWeaknesses}
              onRemove={this.onRemoveWeaknesses} 
              displayValue="name"
              id="type"
            />
          </div>
        </div>
        <div className="pokemon-card-list row">
          {this.state.pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
        </div>
      </div>
    );
  }
}

export default Pokedex;
