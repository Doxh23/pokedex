import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./style/style.css";
import { api } from "./component/utils";
import Component from "./component/Screen";
import Category from "./component/pages/Home/Category";
import { useLocation } from "react-router-dom";
import NavBar from "./component/layout/NavBar";
import Pokemon from "./component/pages/Home/Pokemon";

function App<JsxElement>() {
  const [PokemonData, setPokemonData] = useState<PokemonData|object>({});
  const [offSet, setOffSet] = useState<number>(0);
  const [category, setcategory] = useState<category|object>();
  const [loading, setloading] = useState(true);
  const location = useLocation();
interface PokemonData{
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}
interface category{
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}
 



  useEffect(() => {
    let data:PokemonData
    const fetchDataPokemon = async ():Promise<void> => {
      data = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=20`).then(res => res.data);
      setPokemonData(data);
    };
    const fetchDataCategory = async ():Promise<void> => {
      data = await api(`https://pokeapi.co/api/v2/type/`);
      setcategory(data.results);
    };

    fetchDataPokemon();
    fetchDataCategory();
    setloading(false);
  }, [offSet]);
  console.log(PokemonData)
  return (
    <div className="App w-[100%]  inline-block h-auto  scroll-smooth">
            {!loading ? (
        <>
          <main className=" inline-block w-[100%]  flex-col h-auto relative pokeballCursor bg-gray-900 ">
          <NavBar />
            {location.pathname === "/" ? (
              <>
                <h1
                  className="text-center text-white text-6xl md:text-9xl lg:text-[10rem] mt-12 font-bold  "
                  onClick={() => window.location.reload()}
                >
                  {" "}
                  Pokedex{" "}
                </h1>
                <p className="text-center text-white text-4xl font-bold">
                  {" "}
                  Catch Them All{" "}
                </p>
                <Category category={category} setPokemonData={setPokemonData} />
              </>
            ) : null}
            <Component
              offSet={offSet}
              setOffSet={setOffSet}
              PokemonData={PokemonData}
              loading={loading}
              setPokemonData={setPokemonData}
              category={category}
              setcategory={setcategory}
            />
          </main>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
