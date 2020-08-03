import React from "react";
import PokemonCardData from "../PokemonCardData/PokemonCardData";
import { Link } from "react-router-dom";
import { getBackgroundColor } from "../../pkmTypesFunctions";
import "./Details.css";
import Statbar from "../Statbar/Statbar";

function Details({ pokemon, species, typeInfo }) {
  const GetDescription = () => {
    // Every description has a bunch of different languages available
    // The goal here is to find the only one in english.
    let description = species.flavor_text_entries.find(
      (each) => each.language.name === "en"
    );

    return <p>{description.flavor_text}</p>;
  };

  function ShowStatBar({ each }) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "30px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: "150px", fontFamily: "sans-serif" }}>
          <h4 style={{ marginRight: "10px" }}>{`${each.stat.name} : `}</h4>
        </div>
        <Statbar base={each.base_stat} highest={255} customization={false} />
        <div>{each.base_stat}</div>
      </div>
    );
  }

  const pkmMainType = pokemon.types[0].type.name;
  const bgColor = getBackgroundColor(pkmMainType);

  return (
    <div
      className="detailsContainer"
      style={{
        color: "white",
        textShadow: "2px 2px 4px rgba(0,0,0,.4)",
        backgroundColor: bgColor,
        fontFamily: "sans-serif",
      }}
    >
      <div className="detailsMainFrame">
        <h1 className="pokemonName-title">
          {pokemon.name} N°: {pokemon.id}
        </h1>
        <hr />
        <div className="detailsImage">
          <div className="classicView">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <img src={pokemon.sprites.back_default} alt={pokemon.name} />
          </div>
          <div className="shinyView" style={{ display: "grid" }}>
            <h4>Shiny Variant</h4>
            <div>
              <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
              <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
            </div>
          </div>
        </div>
        <hr />
        <div className="types">
          <h3>
            Type:
            <ul>
              {" "}
              {pokemon.types.map((type) => (
                <li>{type.type.name}</li>
              ))}
            </ul>
          </h3>
          <h3>
            Strong Against:{" "}
            {typeInfo
              ? typeInfo.damage_relations.double_damage_to.map((type) => (
                  <li>{type.name}</li>
                ))
              : null}
          </h3>
          <h3>
            Weak Against:{" "}
            {typeInfo
              ? typeInfo.damage_relations.double_damage_from.map((type) => (
                  <li>{type.name}</li>
                ))
              : null}
          </h3>
        </div>
      </div>

      <div className="secondaryInfoDetails">
        <div className="description">
          <h3>
            {/* GetDescription has to be called as a component otherwise react wont let me render it */}
            <h2>Description: </h2> <GetDescription />
          </h3>
        </div>

        <div className="statsSection">
          {pokemon.stats ? (
            <h3>
              Stats
              <ul>
                {pokemon.stats.map((each) => (
                  <li>
                    <ShowStatBar each={each} />
                  </li>
                ))}
              </ul>
            </h3>
          ) : null}
        </div>
      </div>

      <div className="notDescription">
        <div
          className="evolutions"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {species.evolves_from_species ? (
            <div className="evolutionsCard">
              <h3>Evolves from: </h3>

              <Link
                style={{ textDecoration: "none" }}
                to={`/pokemon/${species.evolves_from_species.name}`}
              >
                <PokemonCardData name={species.evolves_from_species.name} />{" "}
              </Link>
            </div>
          ) : null}
        </div>

        <div className="habitat">
          {species.habitat ? <h3>Habitat: {species.habitat.name}</h3> : null}
        </div>

        <div className="games">
          <h3>{pokemon.name} can be found in the following games</h3>
          <ul className="foundInGame">
            {pokemon.game_indices.map((game) => (
              <li>{game.version.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Details;
