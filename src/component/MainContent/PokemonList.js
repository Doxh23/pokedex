import React from "react";
import Pokemon from "./Pokemon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";
const PokemonList = (props) => {
  let     {PokemonData,loading,category,offSet,setOffSet} = props
  const takePokemonId = (url) => {
    const id = url.split("/")[url.split("/").length - 2];
    return id;
  };
  console.log(PokemonData);
  const handleOffSet = (e) => { 
   
    switch (e) {
      case "next":
        setOffSet(offSet + 20);
        break;
      case "prev":
        if(offSet === 0){
          break
        }
        setOffSet(offSet - 20);
        break
      default:
        break;
    }

  }
  return (
    <>
      {/* container grid grid-cols-5  gap-4 mt-5 align-content-center w-full mx-auto  justify-content-center */}
      <div className="">
        {PokemonData.results &&
          !loading &&
          PokemonData.results.map((pokemon) => {
            return (
              <Pokemon
                key={takePokemonId(pokemon.url)}
                takePokemonId={takePokemonId}
                pokemon={pokemon}
              />
            );
          })}
      </div>
      <div className="flex flex-row fixed m-auto w-full justify-center  top-[95%]  gap-5">
        {offSet === 0 ? null : (
          <FontAwesomeIcon
            icon={faLeftLong}
            onClick={() => handleOffSet("prev")}
            className="text-blue-200 hover:text-violet-500 text-4xl"
          />
        )}
        {PokemonData.count < offSet + 20 ? null : (
          <FontAwesomeIcon
            icon={faRightLong}
            onClick={() => handleOffSet("next")}
            className="text-blue-200 hover:text-violet-500 text-4xl"
          />
        )}
      </div>
    </>
  );
};

export default PokemonList;
