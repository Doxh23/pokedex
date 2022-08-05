import { useEffect } from "react";
import { useState } from "react";
import { Reset } from "styled-reset";
import axios from "axios";
import "./style/style.css";
import { api } from "./component/fetch";
import PokemonList from "./component/PokemonList";
function App() {
  const [Search, setSearch] = useState("");
  const [PokemonData, setPokemonData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  
  useEffect(() => {
    let data = {};
    const fetchData = async () => {
      if (Search !== "") {
        data = await api(`https://pokeapi.co/api/v2/pokemon/${Search}`);
        setOffSet(0);
      } else {
        data = await api(
          `https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=20`
        );
      }
      console.log(data);
      setPokemonData(data.results);
    };
    fetchData();
  }, [Search]);
  return (
    <div className="App">
      <Reset />
      <header>
        <h1>Pokedex</h1>
        <p>gotta catch'em all</p>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name={"search"}
            onChange={handleChange}
            value={Search}
            placeholder="Search..."
          />
          <button type="submit">search</button>
        </form>
      </header>
      <main>
       <PokemonList PokemonData={PokemonData}  />
      </main>
    </div>
  );
}

export default App;
