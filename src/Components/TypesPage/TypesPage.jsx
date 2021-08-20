import React, { useState, useEffect } from "react";
import "./TypesPage.css";
import PokemonCardData from "../PokemonCardData/PokemonCardData.jsx";
import Loading from "../Loading/Loading.jsx";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function TypesPage({ match }) {
  const { typeName } = match.params;
  const [loading, setloading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [limit] = useState(9);
  const [showPokemonsFrom, setShowPokemonsFrom] = useState(0);

  const fetchData = async () => {
    setloading(true);
    setPokemonList([]);
    const url = `https://pokeapi.co/api/v2/type/${typeName}`;
    const req = await fetch(url);
    const data = await req.json();
    setPokemonList(data.pokemon);
    setloading(false);
  };

  useEffect(() => {
    let allowFetch = true;
    allowFetch && fetchData();

    // Unsubscribe fetch request on component unmount
    return () => {
      allowFetch = false;
    };

    // eslint-disable-next-line
  }, [showPokemonsFrom, match]);

  const handleNext = () => {
    setShowPokemonsFrom(showPokemonsFrom + limit);
  };

  const handlePrev = () => {
    if (showPokemonsFrom - limit >= 0) {
      setShowPokemonsFrom(showPokemonsFrom - limit);
    }
  };

  return (
    <div className="containerFluid">
      <div className="buttons">
        <div className="buttonsContainer">
          <button onClick={handlePrev}>
            <FontAwesomeIcon className="icon" icon={faAngleLeft} />
            Previous
          </button>
          <button onClick={handleNext}>
            Next <FontAwesomeIcon className="icon" icon={faAngleRight} />
          </button>
        </div>
      </div>
      <div className="bigContainer">
        {loading ? (
          <Loading />
        ) : (
          pokemonList
            .slice(showPokemonsFrom, showPokemonsFrom + limit)
            .map((pokemon) => (
              <Link
                key={pokemon.id}
                style={{ textDecoration: "none" }}
                to={"/pokemon/" + pokemon.pokemon.name}
              >
                <PokemonCardData key={pokemon.id} name={pokemon.pokemon.name} />
              </Link>
            ))
        )}
      </div>
    </div>
  );
}

export default TypesPage;
