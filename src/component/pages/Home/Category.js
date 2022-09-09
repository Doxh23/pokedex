import React from "react";
import { api, colorType } from "../../utils";
import { useLocation } from "react-router-dom";
const Category = (props) => {
  let location = useLocation();

  console.log(colorType["grass"]);
  const filterTypePokemon = (type) => {
    //filter pokemon by type
    let data = {};
    console.log(type.name);
    const fetchData = async () => {
      data = await api(`https://pokeapi.co/api/v2/type/${type.name}`);
      let dataWorking = {
        results: data.pokemon.map((pokemon) => {
          return {
            name: pokemon.pokemon.name,
            url: pokemon.pokemon.url,
          };
        }),
      };
      setPokemonData(dataWorking);
    };
    fetchData();
  };
  let { category, setPokemonData } = props;
  return (
    <>
      {location.pathname === "/" ? (
        <>
          <hr className="w-4/5 m-auto mb-2" />
          <div className="category text-center m-auto w-4/5">
            {category &&
              category.map((category) => {
                if(category.name !== "unknown" && category.name !== "shadow"){
                return (
                  <button
                    style={{ backgroundColor: `${colorType[category.name]}` }}
                    className="m-2 text-center hover:scale-110 hover:bg-zinc-500 rounded w-24 "
                    onClick={() => filterTypePokemon(category)}
                    key={category.name}
                  >
                    {category.name}
                  </button>
                );}
              })}
          </div>
          <hr className="w-3/5 m-auto mt-2" />
        </>
      ) : null}
    </>
  );
};

export default Category;
