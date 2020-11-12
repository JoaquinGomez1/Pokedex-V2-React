import React from "react";
import "./Card.css";

export default function Card({ data }) {
  const { bgColor, img, name, id } = data;
  return (
    <div className='Card-container' style={{ backgroundColor: bgColor }}>
      <div className='bgFilter' />
      <h3 className='badge-background-text'> {id && `#${id}`}</h3>
      <div className='imageContainer'>
        <div className='badge-background-circle' />
        <img src={img} alt='' className='Card-image' />
      </div>
      <div className='Card-info'>
        <h3 className='Card-name'>{name}</h3>
      </div>
    </div>
  );
}
