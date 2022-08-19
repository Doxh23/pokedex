import { useEffect } from "react";
import { useState } from "react";
import { Reset } from "styled-reset";
import "./style/style.css";
import { api } from "./component/utils";
import Component from "./component/Component";
import  Category  from "./component/MainContent/Category";
import {useLocation} from 'react-router-dom'
function App() {
  const [Search, setSearch] = useState("");
  const [PokemonData, setPokemonData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [category, setcategory] = useState("");
  const [loading, setloading] = useState(true);
  const [test, settest] = useState({})
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    let data = {};
    const fetchDataPokemon = async () => {
      data = await api(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=20`
      );

      console.log(data);
      setPokemonData(data.results);
    };
    const fetchDataCategory = async () => {
      data = await api(`https://pokeapi.co/api/v2/type/`);
      console.log(data);
      setcategory(data.results);
    };
    
    fetchDataPokemon();
   fetchDataCategory();
    setloading(false)
  }, []);
 
  console.log(PokemonData)
  return (
    <div className="App  bg-gray-900">
      <Reset />
    {
     !loading ? (
        <>
      <main className="">
        {location.pathname === "/" ? (   <>
         
          <h1 className="text-center text-white text-9xl font-bold">  Pokedex </h1>
          <p className="text-center text-white text-4xl font-bold"> Catch Them All </p>
          <Category category={category} setPokemonData={setPokemonData} />

        </>  
) : ( null )}
        <Component  PokemonData={PokemonData} loading={loading} setPokemonData={setPokemonData} category={category} setcategory={setcategory} />
      </main>
      </>) : (  <div>Loading...</div> 
      )
    }
    </div>
  );
}

export default App;
