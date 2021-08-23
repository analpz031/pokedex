import React, { Component } from "react";
import "./pokemon-card.scss";
import TypeBadge from "../type-badge/type-badge";
import { Link } from "react-router-dom";

class PokemonCard extends Component {
  render() {
    const pokemon = this.props.pokemon;
    const linkUrl = `/pokemon/${pokemon.num}`;
    return (
      <div key={pokemon.num} className="pokemon-card-wrapper col-lg-3 col-md-4">
        <Link to={linkUrl}>
          <div className="pokemon-card row">
            <div className="col-lg-5 col-12 pokemon-img">
              <img src={pokemon.img} alt={pokemon.name} />
            </div>
            <div className="col-lg-7 col-md-12">
              <ul className="list-unstyled pokemon-info">
                <li className="pokemon-num">#{pokemon.num}</li>
                <li className="pokemon-name">{pokemon.name}</li>
                <li>
                  <h6>Type</h6>
                  {pokemon.type.map((type) => (
                    <TypeBadge type={type} />
                  ))}
                </li>
                <li>
                  <h6>Weaknesses</h6>
                  {pokemon.weaknesses.map((type) => (
                    <TypeBadge type={type} />
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default PokemonCard;
