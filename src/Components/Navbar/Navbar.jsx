import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import "./Navbar.css";

import { LastKnownContext } from "../../context/LastKnownUrl";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState();
  const history = useHistory();
  const { setShowPokemonsFrom } = useContext(LastKnownContext);

  const handleClick = async () => {
    // check if the search values are not empty
    if (searchValue) {
      const req = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}`
      );
      const pokemon = await req.json();
      if (pokemon.id) {
        history.push(`/pokemon/${pokemon.id}`);
      }
    }
  };

  return (
    <nav>
      <div className="insideContainer">
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/"
          onClick={() => setShowPokemonsFrom(0)}
        >
          <h1>PokePedia V2</h1>
        </Link>
        <h3>Built with React</h3>
        <div className="searchBar">
          <input
            style={{ padding: "10px " }}
            type="text"
            placeholder="Look a pokemon up!"
            className="inputSearch"
            onKeyDown={(e) => (e.key === "Enter" ? handleClick() : null)}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button className="btn search-btn" onClick={handleClick}>
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}
