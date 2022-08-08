import { useEffect } from "react";
import { useState } from "react";
import { Reset } from "styled-reset";
import axios from "axios";
import "./style/style.css";
import { api } from "./component/utils";
import PokemonList from "./component/MainContent/PokemonList";
import { Routes, Route } from "react-router-dom";
import SinglePokemon from "./component/single pokemon/SinglePokemon";
import Component from "./component/Component";
import  Category  from "./component/MainContent/Category";
function App() {
  const [Search, setSearch] = useState("");
  const [PokemonData, setPokemonData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [category, setcategory] = useState("");
  const [loading, setloading] = useState(true);
  const [test, settest] = useState({})
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
    <div className="App w-screen bg-gray-900">
      <Reset />
    {
     !loading ? (
        <>
        <header>
        <h1 className="text-center text-6xl text-white ">Pokedex</h1>
        <p className="text-white mb-2">gotta catch'em all </p>
       
      </header>
      <Category category={category} setPokemonData={setPokemonData} />
      <main className="">
        <Component  PokemonData={PokemonData} loading={loading} setPokemonData={setPokemonData} category={category} setcategory={setcategory} />
      </main>
      </>) : (  <div>Loading...</div> 
      )
    }
    </div>
  );
}

export default App;
