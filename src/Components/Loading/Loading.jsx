import React from "react";

export default function Loading() {
  const styles = {
    width: "100vw",
    display: "grid",
    justifyContent: "center",
    color: "white",
    fontFamily: "sans-serif",
  };
  return (
    <div
      data-testid={"loading-component"}
      className="loadingContainer"
      style={styles}
    >
      <img
        style={{
          width: "120px",
          heigth: "100px",
        }}
        src={process.env.PUBLIC_URL + "/Images/General/loading.gif"}
        alt="loading"
      />
      <h1>Loading</h1>
    </div>
  );
}
