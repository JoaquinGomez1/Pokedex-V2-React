import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import "./Navbar.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LastKnownContext } from "../../context/LastKnownUrl";
import { useEffect } from "react";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState();
  const history = useHistory();
  const { setShowPokemonsFrom } = useContext(LastKnownContext);
  const location = useLocation();
  const TOAST_TIME = 3000; // 3 seconds

  const [isLoading, setIsLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [pokemonTypesList, setPokemonTypesList] = useState();

  const fetchData = async () => {
    const req = await fetch(`https://pokeapi.co/api/v2/type/`);
    const res = await req.json();
    if (req.status === 404) notifyError();

    setPokemonTypesList(res.results);
    setIsLoading(false);
  };

  const notifyError = () => toast.error("That pokemon does not exists");

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    // check if the search values are not empty
    if (!searchValue) return;

    setIsSearchLoading(true);
    const req = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}`
    );
    setIsSearchLoading(false);

    if (req.status === 404) notifyError();

    const pokemon = await req.json();
    history.push(`/pokemon/${pokemon.id}`);
  };

  const isActive = (paramTypeName) => {
    let myRoute = location.pathname.split("/");
    if (myRoute.length >= 2) return myRoute[2] === paramTypeName;

    return false;
  };

  return (
    <nav className="bigContainer">
      <div className="insideContainer">
        <ToastContainer
          position="top-center"
          autoClose={TOAST_TIME}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
        />
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
            onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            className={`btn search-btn ${isSearchLoading && " btn-disabled"}`}
            disabled={isSearchLoading}
            onClick={handleSearch}
          >
            {isSearchLoading ? "Searching..." : "Search"}
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
