import React from "react";

export default function Statbar({ base, highest, customization }) {
  if (!base || !highest) {
    return <p>ERROR you must pass base and highest values as parameters</p>;
  }
  const percentage = (base * 100) / highest;
  let defaultColor = "#f2f2f2";
  let defaultHeight = "20px";
  let defaultWidth = "150px";
  let shadow = "2px 2px 4px rgba(0,0,0,.4)";

  if (customization) {
    const { color, width, height, includeShadow } = customization;
    if (color) defaultColor = color;
    if (width) defaultWidth = width;
    if (height) defaultHeight = height;
    if (includeShadow === false) shadow = "none";
  }

  const style = {
    width: `${percentage}%`,
    height: "100%",
    backgroundColor: defaultColor,
    boxShadow: shadow,
  };
  return (
    <div
      className="StatbarComponent"
      style={{ width: defaultWidth, height: defaultHeight }}
    >
      <div style={style} />
    </div>
  );
}
