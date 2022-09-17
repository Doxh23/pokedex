import { useEffect } from "react";
import { useState } from "react";
import "./style/style.css";
import { api } from "./component/utils";
import Component from "./component/Screen";
import Category from "./component/pages/Home/Category";
import { useLocation } from "react-router-dom";
import NavBar from "./component/layout/NavBar";

function App() {
  const [Search, setSearch] = useState("");
  const [PokemonData, setPokemonData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [category, setcategory] = useState("");
  const [loading, setloading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let data = {};
    const fetchDataPokemon = async () => {
      data = await api(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=20`
      );

      setPokemonData(data);
    };
    const fetchDataCategory = async () => {
      data = await api(`https://pokeapi.co/api/v2/type/`);
      setcategory(data.results);
    };

    fetchDataPokemon();
    fetchDataCategory();
    setloading(false);
  }, [offSet]);

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
