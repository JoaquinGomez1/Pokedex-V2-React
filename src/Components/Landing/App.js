import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonCardData from "../PokemonCardData/PokemonCardData.jsx";
import Loading from "../Loading/Loading.jsx";

import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [loading, setloading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(19);
  const [showPokemonsFrom, setShowPokemonsFrom] = useState(1);
  // First time the component renders the data will be fetched
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setloading(true);
    setPokemonList([]);
    fetchData();
  }, [offset, showPokemonsFrom]);

  const fetchData = async () => {
    let tempPkmList = [];

    for (let i = showPokemonsFrom; i < offset; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const req = await fetch(url);
      const data = await req.json();
      tempPkmList.push(data);
    }

    setloading(false);
    setPokemonList(tempPkmList);
  };

  const handleNext = () => {
    setOffset(offset + 19);
    setShowPokemonsFrom(showPokemonsFrom + 19);
  };

  const handlePrev = () => {
    if (showPokemonsFrom - 19 >= 1) {
      setOffset(offset - 19);
      setShowPokemonsFrom(showPokemonsFrom - 19);
    }
  };

  const RenderEachCard = () => {
    return pokemonList.map((pokemon) => (
      <Link style={{ textDecoration: "none" }} to={"/pokemon/" + pokemon.name}>
        <PokemonCardData name={pokemon.name} key={pokemon.id} />
      </Link>
    ));
  };

  return (
    <React.Fragment>
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
        <Container bsPrefix="bigContainer">
          {loading ? <Loading /> : <RenderEachCard />}
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
