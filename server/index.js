const express = require("express");
const utils = require("./utils");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/pokemons", async (req, res) => {
  res.send(await utils.getPokemons(req.query));
});

app.get("/pokemon/types", async (req, res) => {
  res.send(await utils.getAllPokemonTypes());
});

app.get("/pokemon/:num", async (req, res) => {
  res.send(await utils.getPokemonByNum(req.params.num));
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
