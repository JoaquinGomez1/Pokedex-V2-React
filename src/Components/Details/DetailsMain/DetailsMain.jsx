import React from "react";
import "./DetailsMain.module.css";

export default function DetailsMain({ pokemon, typeInfo }) {
  return (
    <div className="details-bio-main increaseOpacityAnimation">
      <h1 className="pokemonName-title">
        {pokemon.name} N°: {pokemon.id}
      </h1>
      <hr />
      <div className="detailsImage">
        <div className="classicView">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <img src={pokemon.sprites.back_default} alt={pokemon.name} />
        </div>
        <div className="shinyView">
          <div>
            <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
            <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
          </div>
        </div>
      </div>
      <hr />
      <div className="types">
        <div className="strong-against">
          <h3>Strong Against: </h3>
          <p>
            {typeInfo &&
              typeInfo.damage_relations.double_damage_to.map((type) => (
                <li key={type.name}>{type.name}</li>
              ))}
          </p>
        </div>
        <div className="weak-against">
          <h3>Weak Against: </h3>
          <p>
            {typeInfo &&
              typeInfo.damage_relations.double_damage_from.map((type) => (
                <li key={type.name}>{type.name}</li>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
}
