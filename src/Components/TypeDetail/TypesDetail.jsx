import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "../Landing/App.css";
import { getBackgroundColor } from "../../pkmTypesFunctions";
import "./TypeDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function TypesDetail({ match }) {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  /*eslint-disable-next-line*/
  useEffect(() => {
    fetchTypesList();
  }, [match]);

  async function fetchTypesList() {
    const url = "https://pokeapi.co/api/v2/type/" + match.params.name;
    console.log(url);
    const req = await fetch(url);
    const data = await req.json();
    setTypes(data);

    // Indicates that we have received a response from the api
    setLoading(false);
  }

  const bgColor = getBackgroundColor(types.name);

  const getDamageRelation = (dmgRel) => {
    const { damage_relations } = types;

    // Prevents null value when there is no relation with another type.
    if (!damage_relations[dmgRel] || damage_relations[dmgRel].length === 0) {
      return <li>None</li>;
    }

    switch (dmgRel) {
      case "double_damage_from":
        return damage_relations.double_damage_from.map((each) => (
          <li key={each.name}>{each.name}</li>
        ));
        break;

      case "double_damage_to":
        return damage_relations.double_damage_to.map((each) => (
          <li key={each.name}>{each.name}</li>
        ));
        break;

      case "half_damage_from":
        return damage_relations.half_damage_from.map((each) => (
          <li key={each.name}>{each.name}</li>
        ));
        break;

      case "half_damage_to":
        return damage_relations.half_damage_to.map((each) => (
          <li key={each.name}>{each.name}</li>
        ));
        break;

      case "no_damage_from":
        return damage_relations.no_damage_from.map((each) => (
          <li key={each.name}>{each.name}</li>
        ));
        break;

      case "no_damage_to":
        return damage_relations.no_damage_to.map((each) => (
          <li key={each.name}>{each.name}</li>
        ));
        break;

      default:
        return (
          <p>
            ERROR: either no parameter was passed to the function or the given
            parameter is invalid{" "}
          </p>
        );
    }
  };

  const getPokemonsWithType = () => {
    if (!types.pokemon) return <li>No pokemons with this type</li>; // it's unlikely that there is no pokemon within a type but I'm implementing it just in case the api fails
    const content = types.pokemon.map((each) => (
      <li key={each.pokemon.name}>{each.pokemon.name}</li>
    ));
    return content;
  };

  return (
    <React.Fragment>
      <div className="containerFluid">
        <Container
          style={{ backgroundColor: bgColor, color: "white" }}
          bsPrefix="bigContainer"
          className="typeDetailsContainer"
        >
          {loading ? (
            <h1>
              Loading
              <h1 />
            </h1>
          ) : (
            <React.Fragment>
              <h1 className="typesName">Type: {types.name}</h1>
              <img
                src={process.env.PUBLIC_URL + `/Images/Types/${types.name}.svg`}
                alt={types.name}
              />
              <div className="damageRelationsContainer">
                <input type="checkbox" id="titleCheck" />
                <label htmlFor="titleCheck">
                  <h2 className="damageTitle">
                    Damage Relations:{" "}
                    <FontAwesomeIcon className="icon" icon={faAngleDown} />
                  </h2>
                </label>
                <div className="damageRelationsDiv">
                  <div className="item">
                    <input type="checkbox" id="DDF" />
                    <label htmlFor="DDF">
                      Double Damage From:{" "}
                      <FontAwesomeIcon className="icon" icon={faAngleDown} />
                    </label>
                    <ul className="doubleDamageFrom">
                      {getDamageRelation("double_damage_from")}
                    </ul>
                  </div>

                  <div className="item">
                    <input type="checkbox" id="DDT" />
                    <label htmlFor="DDT">
                      Double Damage To:{" "}
                      <FontAwesomeIcon className="icon" icon={faAngleDown} />
                    </label>
                    <ul className="doubleDamageTo">
                      {getDamageRelation("double_damage_to")}
                    </ul>
                  </div>

                  <div className="item">
                    <input type="checkbox" id="HDF" />
                    <label htmlFor="HDF">
                      Half Damage From:{" "}
                      <FontAwesomeIcon className="icon" icon={faAngleDown} />
                    </label>
                    <ul className="halfDamageFrom">
                      {getDamageRelation("half_damage_from")}{" "}
                    </ul>
                  </div>

                  <div className="item">
                    <input type="checkbox" id="HDT" />
                    <label htmlFor="HDT">
                      Half Damage To:{" "}
                      <FontAwesomeIcon className="icon" icon={faAngleDown} />
                    </label>
                    <ul className="halfDamageTo">
                      {getDamageRelation("half_damage_to")}
                    </ul>
                  </div>

                  <div className="item">
                    <input type="checkbox" id="NDF" />
                    <label htmlFor="NDF">
                      No Damage From:{" "}
                      <FontAwesomeIcon className="icon" icon={faAngleDown} />
                    </label>
                    <ul className="noDamageFrom">
                      {getDamageRelation("no_damage_from")}
                    </ul>
                  </div>
                  <div className="item">
                    <input type="checkbox" id="NDT" />
                    <label htmlFor="NDT">
                      No Damage To:{" "}
                      <FontAwesomeIcon className="icon" icon={faAngleDown} />
                    </label>
                    <ul className="noDamageTo">
                      {getDamageRelation("no_damage_to")}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="pokemonsWithTypeContainer">
                <div className="itemType">
                  <input type="checkbox" id="PWT" />
                  <label htmlFor="PWT">Pokemons with this type</label>
                  <ul>{getPokemonsWithType()}</ul>
                </div>
              </div>
            </React.Fragment>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
}
