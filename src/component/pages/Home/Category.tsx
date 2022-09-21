import React from "react";
import { api, colorType } from "../../utils";
import { useLocation } from "react-router-dom";
import { category } from "./type";
const Category = (props) => {
  let location = useLocation();

  console.log(colorType["grass"]);
  interface data {
    results?: any;
    pokemon?: Array<any>;
  }
  interface pokemon {
    pokemon?: any;
  }
  const filterTypePokemon = (type:any) => {
    //filter pokemon by type
    let data:data
    console.log(type.name);
    const fetchData = async ():Promise<any> => {
      data = await api(`https://pokeapi.co/api/v2/type/${type.name}`);
      let dataWorking = {
        results:  data.pokemon.map((pokemon:(pokemon)) => {
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
              category.map((category:category) => {
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
