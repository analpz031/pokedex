const axios = require("axios").default;
var _ = require("lodash");

/**
 * Gets All Pokemon Info and map data to correct format
 */
async function getAllPokemons() {
  let response;
  try {
    response = await axios.get(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    );
    return response.data.pokemon.map((pokemon) => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        num: pokemon.num,
        img: pokemon.img,
        type: pokemon.type,
        weaknesses: pokemon.weaknesses,
        next_evolution: pokemon.next_evolution,
        prev_evolution: pokemon.prev_evolution,
        height: pokemon.height,
        weight: pokemon.weight,
      };
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * Filters pokemon list depending on query sents
 * @param query: filters from query
 */

async function getPokemons(query) {
  const filters = Object.keys(query);
  let pokemons = await getAllPokemons();
  console.log("length pokemon no filter", pokemons.length);
  if (filters.length > 0) {
    filters.forEach((filter) => {
      const filterValue = query[filter].split(",");
      pokemons = filterPokemonList(pokemons, filter, filterValue);
    });
  }
  return pokemons;
}

function filterPokemonList(pokemons, filter, value) {
  let filteredPokemonList = pokemons;
  value.forEach((filterValue) => {
    filteredPokemonList = filteredPokemonList.filter((pokemon) => {
      const pokemonValue = Array.isArray(pokemon[filter])
        ? pokemon[filter].map((val) => val.toLowerCase())
        : pokemon[filter].toLowerCase();
      return pokemonValue.includes(filterValue.toLowerCase());
    });
  });
  return filteredPokemonList;
}

/**
 * Uses pokemon num to return pokemon data
 * @param num: Pokemon num
 */
async function getPokemonByNum(num) {
  let pokemons = await getAllPokemons();

  return pokemons.find((pokemon) => pokemon.num == num);
}

/**
 * Returns all Pokemon Types
 */
async function getAllPokemonTypes() {
  let pokemons = await getAllPokemons();
  let pokemonTypes = _.uniq(_.flatten(pokemons.map((pokemon) => pokemon.type)));
  console.log(pokemonTypes);
  return pokemonTypes;
}

module.exports = {
  getAllPokemons,
  getPokemons,
  getAllPokemonTypes,
  getPokemonByNum,
};
