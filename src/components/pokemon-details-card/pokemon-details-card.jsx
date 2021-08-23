import React, { Component } from "react";
import TypeBadge from "../type-badge/type-badge";
import "./pokemon-details-card.scss";
import { Link } from "react-router-dom";
import * as _ from "lodash";
class PokemonDetails extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {},
    };
  }
  componentDidMount() {
    this.getPokemon();
  }

  /**
   * Get pokemon by num, and sets pokemon info on state
   */
  getPokemon = () => {
    console.log(this.props.num);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      this.setState({ pokemon: JSON.parse(xhr.responseText) });
      console.log(this.state.pokemon);
    });
    xhr.open("GET", `/pokemon/${this.props.num}`);
    xhr.send();
  };

  /**
   * Handels when a different pokemon is selected
   */

  handleChange = () => {
    this.getPokemon();
  };

  render() {
    const pokemon = this.state.pokemon;
    return (
      <React.Fragment>
        <div className="back m-5">
          <Link to="/">Go Back</Link>
        </div>
        <div className="pokemon-details">
          <div className="pokemon-details-card row">
            <div className="col-lg-7 col-12 pokemon-img">
              <img src={pokemon.img} alt={pokemon.name} />
            </div>
            <div className="col-lg-5 col-md-12">
              <ul className="list-unstyled pokemon-info">
                <li className="pokemon-num">#{pokemon.num}</li>
                <li className="pokemon-name">{pokemon.name}</li>
                <li className="pokemon-num">
                  <span>{pokemon.height}</span> <span>{pokemon.weight}</span>
                </li>
                <li>
                  <h6>Type</h6>
                  {_.map(pokemon.type, (type) => (
                    <TypeBadge type={type} />
                  ))}
                </li>
                <li>
                  <h6>Weaknesses</h6>
                  {_.map(pokemon.weaknesses, (type) => (
                    <TypeBadge type={type} />
                  ))}
                </li>
              </ul>
            </div>
            <div className="col-12 row">
              <div className="col-md-6">
                <div className="m-5">
                  <h6>Previous Evolutions</h6>
                  {_.map(pokemon.prev_evolution, (pokemon) => {
                    const linkUrl = `/pokemon/${pokemon.num}`;
                    return (
                      <span onClick={this.getPokemon} className="me-2">
                        <Link to={linkUrl}>{pokemon.name}</Link>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="col-md-6">
                <div className="m-5 text-end">
                  <h6>Next Evolutions</h6>
                  {_.map(pokemon.next_evolution, (pokemon) => {
                    const linkUrl = `/pokemon/${pokemon.num}`;
                    return (
                      <span onClick={this.getPokemon} className="ms-2">
                        <Link to={linkUrl}>{pokemon.name}</Link>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PokemonDetails;
