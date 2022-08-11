import React from "react";
import Pokemon from "./Pokemon";
const PokemonList = (props) => {
  let { PokemonData, loading } = props;
  const takePokemonId = (url) => {
    const id = url.split("/")[url.split("/").length - 2];
    return id;
  };
  return (
    <>
    {/* container grid grid-cols-5  gap-4 mt-5 align-content-center w-full mx-auto  justify-content-center */}
      <div className="">
      {PokemonData &&
        !loading &&
        PokemonData.map((pokemon) => {
          return (
            <Pokemon 
              key={takePokemonId(pokemon.url)}
              takePokemonId={takePokemonId}
              pokemon={pokemon}
            />
            
          );
        })}
        </div>
    </>
  );
};

export default PokemonList;
