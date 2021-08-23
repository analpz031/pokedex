import React from "react";
import { useParams } from "react-router-dom";

import PokemonDetails from "../pokemon-details-card/pokemon-details-card";

function GetPokemonId() {
  const { num } = useParams();

  return (
    <div>
      <PokemonDetails num={num} />
    </div>
  );
}

export default GetPokemonId;
