import React from "react";
import Statbar from "../../Statbar/Statbar";
import { getBackgroundColor } from "../../../pkmTypesFunctions";

export default function DetailsStats({ pokemon, species }) {
  const pkmMainType = pokemon.types[0].type.name;
  const bgColor = getBackgroundColor(pkmMainType);
  return (
    <div className='secondaryInfoDetails increaseOpacityAnimation'>
      <div className='description'>
        {/* GetDescription has to be called as a component otherwise react wont let me render it */}
        <h2>
          Description:{" "}
          <span>
            <p>{GetDescription(species)}</p>
          </span>{" "}
        </h2>
      </div>

      <div className='statsSection'>
        {pokemon.stats ? (
          <>
            <ul>
              {pokemon.stats.map((each) => (
                <li key={each.stat.name}>
                  <ShowStatBar
                    bgColor={bgColor}
                    each={each}
                    customization={{ color: bgColor }}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}

const GetDescription = (species) => {
  // Every description has a bunch of different languages available
  // The goal here is to find the only one in english.
  let description = species.flavor_text_entries.find(
    (each) => each.language.name === "en"
  );

  return description.flavor_text;
};

function ShowStatBar({ each, customization }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "30px",
      }}>
      <div style={{ width: "200px" }}>
        <h4 style={{ marginRight: "10px" }}>{`${each.stat.name} : `}</h4>
      </div>
      <Statbar
        base={each.base_stat}
        highest={255}
        customization={customization}
      />
      <div>{each.base_stat}</div>
    </div>
  );
}
