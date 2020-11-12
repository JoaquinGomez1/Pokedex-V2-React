import React from "react";
import { getBackgroundColor } from "../../pkmTypesFunctions";
import "./Details.css";

import Tabs from "../Tabs/Tabs";
import DetailsHabitat from "./DetailsHabitat/DetailsHabitat";
import DetailsMain from "./DetailsMain/DetailsMain";
import DetailsStats from "./DetailsStats/DetailsStats";

function Details({ pokemon, species, typeInfo }) {
  const pkmMainType = pokemon.types[0].type.name;
  const bgColor = getBackgroundColor(pkmMainType);
  const japaneseName = species.names.find((name) => {
    if (name.language.name === "ja") return name;
    else return null;
  });

  return (
    <div className='detailsContainer'>
      {/*Left Image*/}
      <div
        className='details-main-image-container'
        style={{ backgroundColor: bgColor }}>
        <div className='details-main-image-content'>
          <h4 className='badge-background-text details-main-id'>
            #{pokemon.id}
          </h4>
          <h2 className='badge-background-text details-main-name'>
            {pokemon.name}
          </h2>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name + " image"}
          />
          <div className='badge-background-circle' />

          <div className='pkm-japanese-name'>
            <h1>{japaneseName.name}</h1>
          </div>

          <div className='details-pokemon-type'>
            {pokemon.types.map(({ type }) => (
              <h2
                key={type.name}
                className='badge badge-pkm-type'
                style={{ backgroundColor: getBackgroundColor(type.name) }}>
                {type.name}
              </h2>
            ))}
          </div>
        </div>
      </div>
      <Tabs>
        <DetailsMain name='Bio' pokemon={pokemon} typeInfo={typeInfo} />
        <DetailsStats name='Stats' pokemon={pokemon} species={species} />
        <DetailsHabitat name='Evolution' pokemon={pokemon} species={species} />
      </Tabs>
    </div>
  );
}

export default Details;
