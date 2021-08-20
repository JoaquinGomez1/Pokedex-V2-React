import React from "react";
import PokemonCardData from "../../PokemonCardData/PokemonCardData";
import { Link } from "react-router-dom";

export default function DetailsHabitat({ pokemon, species }) {
  return (
    <div className="notDescription increaseOpacityAnimation">
      <div
        className="evolutions"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {species.evolves_from_species && (
          <div className="evolutionsCard">
            <h3>Evolves from: </h3>

            <Link
              style={{ textDecoration: "none" }}
              to={`/pokemon/${species.evolves_from_species.name}`}
            >
              <PokemonCardData name={species.evolves_from_species.name} />{" "}
            </Link>
          </div>
        )}
      </div>

      <div className="habitat">
        {species.habitat && <h3>Habitat: {species.habitat.name}</h3>}
      </div>

      <div className="games">
        <h3>{pokemon.name} can be found in the following games</h3>
        <ul className="foundInGame">
          {pokemon.game_indices.map((game) => (
            <li style={{ textAlign: "left" }} key={game.version.name}>
              {game.version.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
