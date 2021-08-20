import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import "./Navbar.css";

import { LastKnownContext } from "../../context/LastKnownUrl";
import { useEffect } from "react";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState();
  const history = useHistory();
  const { setShowPokemonsFrom } = useContext(LastKnownContext);
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemonTypesList, setPokemonTypesList] = useState();

  const fetchData = async () => {
    const req = await fetch(`https://pokeapi.co/api/v2/type/`);
    const res = await req.json();

    setPokemonTypesList(res.results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const isActive = (paramTypeName) => {
    let myRoute = location.pathname.split("/");
    if (myRoute.length >= 2) return myRoute[2] === paramTypeName;

    return false;
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

          <div className="types-selector-container">
            <ul className="combobox-container">
              {!isLoading &&
                pokemonTypesList?.map((each) => {
                  return (
                    <li
                      key={each.name}
                      style={{
                        backgroundColor: isActive(each.name)
                          ? "#d11544"
                          : "gray",
                      }}
                      className="combobox-item"
                    >
                      <Link to={`/types/${each.name}`}>{each.name}</Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
