import React from "react";
import "./Card.css";

export default function Card({ data }) {
  const { bgColor, img, name, subtitle } = data;
  return (
    <div className="Card-container" style={{ backgroundColor: bgColor }}>
      <div className="bgFilter" />
      <div className="imageContainer">
        <img src={img} alt="" className="Card-image" />
      </div>
      <div className="Card-info">
        <h3>{name}</h3>
        {subtitle ? <h5>N: {subtitle}</h5> : null}
      </div>
    </div>
  );
}
