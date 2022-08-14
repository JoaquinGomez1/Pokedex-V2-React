import React, { useState, useEffect } from "react";
import Details from "../Details/Details";
import Loading from "../Loading/Loading";

// ------------------ Main Component ------------------
export default function PokemonDetails({ match }) {
  const name = match.params.name;
  const [pokemon, setPokemon] = useState();
  const [species, setSpecies] = useState();
  const [loaded, setLoaded] = useState(false);
  const [typeInfo, setTypeInfo] = useState();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [match]);

  // Wait for pokemon data response
  useEffect(() => {
    fetchTypesData();
    // eslint-disable-next-line
  }, [loaded]);

  const fetchData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const req = await fetch(url);
    const pokemonData = await req.json();
    setPokemon(pokemonData);

    const ulrSpecies = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    const reqSpecies = await fetch(ulrSpecies);
    const speciesData = await reqSpecies.json();
    setSpecies(speciesData);

    setLoaded(true);
  };

  const fetchTypesData = async () => {
    if (loaded) {
      const mainTypeIndex = pokemon.types.length === 2 ? 1 : 0;

      const ulrTypes = pokemon.types[mainTypeIndex].type.url;
      const reqTypes = await fetch(ulrTypes);
      const typesData = await reqTypes.json();
      setTypeInfo(typesData);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {loaded ? (
        <Details pokemon={pokemon} species={species} typeInfo={typeInfo} />
      ) : (
        <div style={{ marginTop: "20px" }} className="bigContainer">
          <Loading />
        </div>
      )}
    </div>
  );
}
