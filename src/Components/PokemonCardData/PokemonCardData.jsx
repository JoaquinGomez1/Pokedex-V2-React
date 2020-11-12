import React, { useState, useEffect } from "react";
import { getBackgroundColor } from "../../pkmTypesFunctions";
import Card from "../Card/Card.jsx";

// ----- This component handles the state of each pokemon card ----- //

function PokemonCardData({ name }) {
  const [img, setImg] = useState();
  const [stateName, setStateName] = useState(name);
  const [types, setTypes] = useState();
  const [loaded, setLoaded] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    let allowFetch = true;
    allowFetch && fetchData();

    return () => (allowFetch = false);

    // eslint-disable-next-line
  }, [name]);

  const fetchData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const req = await fetch(url);
    const data = await req.json();
    setImg(data.sprites.other["official-artwork"].front_default);
    setStateName(data.name);
    setTypes(data.types);
    setId(data.id);
    setLoaded(true);
  };

  if (loaded) {
    //First type is always considered to be the main type of a pokemon
    const pkmMainType = types[0].type.name;
    const bgColor = getBackgroundColor(pkmMainType);
    const data = {
      bgColor: bgColor,
      name: stateName,
      types: types,
      id: id,
      img: img,
    };

    return <Card key={id} data={data} />;
  } else {
    return null;
  }
}

export default PokemonCardData;
