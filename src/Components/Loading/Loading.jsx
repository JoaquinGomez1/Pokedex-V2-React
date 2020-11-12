import React from "react";

export default function Loading() {
  const styles = {
    width: "100%",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "sans-serif",
  };
  return (
    <div style={styles}>
      <div style={{ margin: "0 auto" }}>
        <img
          style={{
            width: "120px",
            heigth: "100px",
          }}
          src={process.env.PUBLIC_URL + "/Images/General/loading.gif"}
          alt='loading'
        />
        <h1>Loading</h1>
      </div>
    </div>
  );
}
