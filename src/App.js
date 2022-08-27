import { useEffect } from "react";
import { useState } from "react";
import { Reset } from "styled-reset";
import "./style/style.css";
import { api } from "./component/utils";
import Component from "./component/Component";
import  Category  from "./component/MainContent/Category";
import {useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightLong,faLeftLong} from '@fortawesome/free-solid-svg-icons'
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
  useEffect(() => {
    let data = {};
    const fetchDataPokemon = async () => {
      data = await api(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=20`
      );
          
      console.log(data);
      setPokemonData(data);
    };
    const fetchDataCategory = async () => {
      data = await api(`https://pokeapi.co/api/v2/type/`);
      console.log(data);
      setcategory(data.results);
    };
    
    fetchDataPokemon();
   fetchDataCategory();
    setloading(false)
  }, [offSet]);
 
  console.log(PokemonData.results)
  return (
    <div className="App w-auto inline-block bg-gray-900">
      <Reset />
    {
     !loading ? (
        <>
      <main className="w-auto inline-block flex-col relative ">
        {location.pathname === "/" ? (   <>
         
          <h1 className="text-center text-white text-9xl font-bold">  Pokedex </h1>
          <p className="text-center text-white text-4xl font-bold"> Catch Them All </p>
          <Category category={category} setPokemonData={setPokemonData} />

        </>  
) : ( null )}
        <Component  PokemonData={PokemonData.results} loading={loading} setPokemonData={setPokemonData} category={category} setcategory={setcategory} />
       
      </main>
      <div className="flex flex-row fixed m-auto w-full justify-center  top-[95%]  gap-5">
        {offSet === 0 ? null : (        <FontAwesomeIcon icon={faLeftLong} onClick={ () => handleOffSet("prev")} className="text-blue-200 hover:text-violet-500 text-4xl" />
) }
        {PokemonData.count < offSet+20 ? null : (        <FontAwesomeIcon icon={faRightLong} onClick={ () => handleOffSet("next")} className="text-blue-200 hover:text-violet-500 text-4xl" />  )}
        </div>
      </>) : (  <div>Loading...</div> 
      )
    }
    </div>
  );
}

export default App;
