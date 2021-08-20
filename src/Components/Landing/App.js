import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import PokemonCardData from "../PokemonCardData/PokemonCardData.jsx";
import Loading from "../Loading/Loading.jsx";

import { LastKnownContext } from "../../context/LastKnownUrl";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [loading, setloading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [limit] = useState(9);
  const { showPokemonsFrom, setShowPokemonsFrom } =
    useContext(LastKnownContext);

  const fetchData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${showPokemonsFrom}`;
    const req = await fetch(url);
    const data = await req.json();
    setloading(false);
    setPokemonList(data.results);
  };

  useEffect(() => {
    setloading(true);
    setPokemonList([]);
    let allowFetch = true;
    allowFetch && fetchData();

    // Unsubscribe fetch request on component unmount
    return () => {
      allowFetch = false;
    };

    // eslint-disable-next-line
  }, [limit, showPokemonsFrom]);

  const handleNext = () => {
    setShowPokemonsFrom(showPokemonsFrom + 9);
  };

  const handlePrev = () => {
    if (showPokemonsFrom - 9 >= 0) {
      setShowPokemonsFrom(showPokemonsFrom - 9);
    }
  };

  const RenderEachCard = () => {
    return pokemonList.map((pokemon) => (
      <Link
        key={pokemon.id}
        style={{ textDecoration: "none" }}
        to={"/pokemon/" + pokemon.name}
      >
        <PokemonCardData key={pokemon.id} name={pokemon.name} />
      </Link>
    ));
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
      <div className="bigContainer boxShadow">
        {loading ? <Loading /> : <RenderEachCard />}
      </div>
    </div>
  );
}

export default App;
