import React, { useState } from "react";

export const LastKnownContext = React.createContext();

export default function LastKnownUrl(props) {
  const [showPokemonsFrom, setShowPokemonsFrom] = useState(0);

  return (
    <LastKnownContext.Provider
      {...props}
      value={{
        showPokemonsFrom,
        setShowPokemonsFrom,
      }}
    />
  );
}
