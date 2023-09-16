import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colorType, api } from "../../utils";
import {
  chain,
  Move,
  Pokemon,
  PokemonEvolutionChain,
  PokemonSpecies,
} from "./type";
import About from "./About";
import BaseStats from "./BaseStats";
import Evolution from "./Evolution";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faVenus,
  faQuestionCircle,
  faX,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Moves from "./Moves";
import { evolution } from "./type";
import { workerData } from "worker_threads";
import Loading from "../../layout/Loading";
const SinglePokemon = () => {
  const [pokemon, setpokemon] = useState<PokemonEvolutionChain>();
  const [loading, setloading] = useState<boolean>(true);
  const [pokemonColor, setpokemonColor] = useState<string>("");
  const [tabActive, settabActive] = useState<string | null>("About");
  const [evolution, setEvolution] = useState<object>({});
  const [test, settest] = useState<boolean>(true);
  const { id } = useParams<string>();

  const topFunction = () => {
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  };

  const handleTabsChange = (e: string) => {
    let tabs: string | null = "";
    switch (e) {
      case "About":
        tabs = "About";
        break;
      case "Evolution":
        tabs = "Evolution";
        break;
      case "BaseStats":
        tabs = "BaseStats";
        break;
      case "Moves":
        tabs = "Moves";
        break;
      default:
        tabs = null;
        break;
    }

    settabActive(tabs);
  };
  const handleFetchEvolution = async (data: PokemonEvolutionChain) => {
    if (!data?.chain) {
      return;
    }
    let dataChain: chain = data.chain;
    let workingData: chain = dataChain;
    do {
      console.log(dataChain);
      if (dataChain.species) {
        workingData = await api(dataChain.species.url);
      }
      workingData.evolution_details = dataChain.evolution_details;
      setEvolution((prev) => {
        return {
          ...prev,
          [workingData.name ? workingData.name : ""]: workingData,
        };
      });
      dataChain = dataChain.evolves_to ? dataChain.evolves_to[0] : null;
      console.log(dataChain);
    } while (dataChain);
  };
  const params = useParams();

  useEffect(() => {
    var data1: Pokemon;
    var data2: PokemonSpecies;
    var data3: PokemonEvolutionChain;
    const fetchData = async () => {
      data1 = await api(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
      data2 = await api(data1.species.url);
      data3 = await api(data2.evolution_chain.url);
      setpokemon({ ...data1, ...data2, ...data3 });
      setpokemonColor(data1.types[0].type.name);
      setloading(false);
    };
    fetchData();
  }, [id]);
  return (
    <>
      {!loading ? (
        <div
          className="card-singlePokemon scroll-smooth  "
          id="singlePokemon"
          style={{
            backgroundColor: colorType[pokemonColor],
            color: "black",
          }}
        >
          <h1 className="name text-center text-white pt-5 text-6xl font-semibold">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <div className="sprite w-full flex m-auto">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`}
              className="m-auto  w-[250px] h-[250px]"
              alt={pokemon.name}
            />
          </div>
          <div className=" m-auto rounded-t-[75px] bg-white  information w-full h-full">
            <div className="types flex flex-column justify-around pt-2">
              {pokemon.types?.map((type) => {
                return (
                  <p
                    style={{ color: colorType[type.type.name] }}
                    className={`w-full font-bold text-center`}
                    key={type.type.name}
                  >
                    {type.type.name}
                  </p>
                );
              })}
            </div>
            <hr className="bg-slate-400 mx-auto my-5 w-7/12 h-[2px] text-slate-800" />
            <div className="onglet flex flex-row w-full pt-[20px] justify-between">
              <div
                style={
                  tabActive === "About"
                    ? { color: colorType[pokemonColor] }
                    : null
                }
                onClick={() => handleTabsChange("About")}
                className="about  hover:text-red-500 font-semibold w-full cursor-pointer  text-center"
              >
                {" "}
                about
              </div>
              <div
                style={
                  tabActive === "BaseStats"
                    ? { color: colorType[pokemonColor] }
                    : null
                }
                onClick={() => handleTabsChange("BaseStats")}
                className="carac w-full text-center hover:text-red-500 font-semibold cursor-pointer"
              >
                {" "}
                Base stats
              </div>
              <div
                style={
                  tabActive === "Evolution"
                    ? { color: colorType[pokemonColor] }
                    : null
                }
                onClick={() => {
                  handleTabsChange("Evolution");
                  handleFetchEvolution(pokemon);
                }}
                className="ability w-full text-center hover:text-red-500 font-semibold cursor-pointer"
              >
                {" "}
                Evolution
              </div>
              <div
                style={
                  tabActive === "Moves"
                    ? { color: colorType[pokemonColor] }
                    : null
                }
                onClick={() => handleTabsChange("Moves")}
                className="moves w-full text-center hover:text-red-500 font-semibold cursor-pointer"
              >
                {" "}
                Moves
              </div>
            </div>
            <hr className="bg-slate-400 mx-auto my-5 w-11/12 h-[2px] text-slate-600" />
            <div className="carac-general flex flex-col w-full  rounded-lg ">
              <div
                className="about text-center"
                style={
                  tabActive === "About"
                    ? { display: "inline" }
                    : { display: "none" }
                }
                onClick={() => handleTabsChange("About")}
              >
                <About pokemon={pokemon} />
              </div>
              <div
                className="BaseStats w-full flex flex-col pt-[20px]"
                style={
                  tabActive === "BaseStats"
                    ? { display: "inline" }
                    : { display: "none" }
                }
              >
                <BaseStats pokemon={pokemon} />
              </div>
              <div
                className="evolutions mb-8"
                style={
                  tabActive === "Evolution"
                    ? { display: "inline" }
                    : { display: "none" }
                }
              >
                <div className="evolution flex flex-row gap-5  w-full justify-evenly">
                    <Evolution handleTabsChange={handleTabsChange} evolution={evolution} pokemonColor={pokemonColor} />
                </div>
              </div>
            </div>

            <div
              className="moves  "
              style={{ display: tabActive === "Moves" ? "inline" : "none" }}
            >
              <table className="border border-solid border-[#1cea] w-full h-[200%] text-left ">
                <thead
                  className=" border-b-slate-900 border-b-[2px] border-solid "
                  style={{
                    background: colorType[pokemonColor],
                  }}
                >
                  <tr className="gap-5 text-center text-[1px] ">
                    <th className=" font-semibold text-[#ffff] px-8 text-[10px] ">
                      names
                    </th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">
                      Type
                    </th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">
                      cat
                    </th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">
                      power
                    </th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">
                      accuracy
                    </th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">
                      pp
                    </th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">
                      effect
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[15px] text-[#331b03] text-center ">
                  {pokemon.moves?.map((move: Move, i: number) => {
                    return (
                      
                        <tr
                          key={move.move.name}
                          className=" even:bg-[#d0e4f5] text-[7px] md:text-[15px]"
                        >
                          <Moves
                            moveUrl={move.move.url}
                            key={i}
                            index={i}
                            color={colorType[pokemonColor]}
                          />
                        </tr>
                      
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <button
            className="arrowUp fixed rounded-[50%] right-5 bottom-12 w-[50px] h-[50px] bg-black"
            style={{ background: colorType[pokemonColor] }}
            onClick={() => topFunction()}
          >
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-white w-[65%] h-[65%]"
            />
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SinglePokemon;
