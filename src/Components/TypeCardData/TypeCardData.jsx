import React, { useState, useEffect } from "react";
import { getBackgroundColor } from "../../pkmTypesFunctions";
import Card from "../Card/Card";

//the prop 'isType' must be boolean, determines if the card is used for rendering pokemons or pokemons types
function TypeCardData({ name, id }) {
  const [img, setImg] = useState();
  const [type, setType] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [name]);

  const fetchData = async () => {
    // There are only 18 pokemon types but the api, for some unkwon reason, has 20.
    const numberOfTypesWithUrl = 18;
    if (id <= numberOfTypesWithUrl) {
      const url = `https://pokeapi.co/api/v2/type/${name}`;
      const req = await fetch(url);
      const data = await req.json();

      setType(data.name);
      setImg(process.env.PUBLIC_URL + `/Images/Types/${data.name}.svg`); // Sets image to the corresponding svg name
      setLoaded(true);
    }
  };
  const bgColor = getBackgroundColor(type);
  const myData = {
    img: img,
    types: type,
    name: name,
    bgColor: bgColor,
  };
  return loaded && <Card key={id} data={myData} />;
}

export default TypeCardData;
