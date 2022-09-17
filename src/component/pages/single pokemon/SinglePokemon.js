import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colorType, api } from "../../utils";
import About from "./About";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faVenus,
  faQuestionCircle,
  faX,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Moves from "./Moves";
const SinglePokemon = () => {
  const [pokemon, setpokemon] = useState({});
  const [loading, setloading] = useState(true);
  const [tabActive, settabActive] = useState("About");
  const [evolution, setEvolution] = useState({});
  const [PokemonColor, setPokemonColor] = useState("");
  const [test, settest] = useState(true);
  const { id } = useParams();
const  topFunction =() => {

  window.scrollTo({
    top: 0,
    left:100,
    behavior: "smooth"
  })
}
 
  const handleTabsChange = (e) => {
    let tabs = "";
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
  const handleFetchEvolution = async (data) => {
    let workingData = {};
    if (!data?.chain) {
      return;
    }
    data = data.chain;
    do {
      workingData = await api(data.species.url);
      workingData.evolution_details = data.evolution_details;
      setEvolution((prev) => {
        return { ...prev, [workingData.name]: workingData };
      });
      data = data.evolves_to[0];
    } while (data);
  };
  const params = useParams();
  
  useEffect(() => {
    let data1 = {};
    let data2 = {};
    let data3 = {};
    const fetchData = async () => {
      data1 = await api(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
      data2 = await api(data1.species.url);
      data3 = await api(data2.evolution_chain.url);
      setpokemon({ ...data1, ...data2, ...data3 });
      setloading(false);
    };
    fetchData();
  }, [id]);
  //   console.log(pokemon);
  return (
    <>
      {!loading ? (
        <div
          className="card-singlePokemon scroll-smooth  "
          id="singlePokemon"
          style={{
            backgroundColor: colorType[pokemon?.types[0]?.type?.name],
            color: "black",
          }}
        >
          <h1 className="name text-center text-white pt-5 text-6xl font-semibold">
            {pokemon.name}
          </h1>
          <div className="sprite w-1/5 flex m-auto">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`}
              className="m-auto min-w-full min-h-full"
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
                    ? { color: colorType[pokemon?.types[0]?.type?.name] }
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
                    ? { color: colorType[pokemon?.types[0]?.type?.name] }
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
                    ? { color: colorType[pokemon?.types[0]?.type?.name] }
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
                    ? { color: colorType[pokemon?.types[0]?.type?.name] }
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
                <div
                  style={{
                    backgroundColor: colorType[pokemon?.types[0]?.type?.name],
                  }}
                  className="stats flex flex-row justify-around w-[90%] rounded  m-auto "
                >
                  <div className="stat flex flex-row items-center gap-3 text-center h-[300px] rounded-t   w-full">
                    {pokemon.stats?.map((stat) => {
                      return (
                        <div
                          className={` ${stat.stat.name} flex flex-col justify-start gap-2 w-[16%] p-[5px] h-full max-w-[15%]`}
                        >
                          <div className="bar h-[230px]  content-between rounded-b-md rotate-180 shadow">
                            <div
                              className="barProgress rounded-b-md bg-white"
                              style={{
                                height: `${(stat.base_stat / 250) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <div className="information text-white font-[600]">
                            <div className="stat">{stat.base_stat}</div>
                            <div className="name">{stat.stat.name}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div
                className="evolutions"
                style={
                  tabActive === "Evolution"
                    ? { display: "inline" }
                    : { display: "none" }
                }
              >
                <div className="evolution flex flex-row gap-10 w-full justify-evenly">
                  {Object.keys(evolution).map((key, index) => {
                    return (
                      <Link
                        className="evolution flex flex-col items-center gap-5"
                        onClick={() => handleTabsChange("About")}
                        to={`/SinglePokemon/${evolution[key].id}`}
                      >
                        <div className="evolutionName text-center">
                          {evolution[key].name}
                        </div>
                        <div className="evolutionImage">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution[key].id}.png`}
                          />
                        </div>
                        <div className="evolutionType">
                          {evolution[key].evolution_details[0]?.trigger?.name}
                        </div>
                        <div className="evolutionLevel">
                          {evolution[key].evolution_details[0]?.min_level
                            ? evolution[key].evolution_details[0]?.min_level +
                              " Min Level"
                            : evolution[key].evolution_details[0]?.min_happiness
                            ? evolution[key].evolution_details[0]
                                ?.min_happiness + " minimum Happiness"
                            : ""}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
                  
            <div className="moves  " style={{display: tabActive === "Moves" ? "inline" : "none"}}>
              <table className="border border-solid border-[#1cea] w-full h-[200%] text-left ">
                <thead className=" border-b-slate-900 border-b-[2px] border-solid " style={{background: colorType[pokemon?.types[0]?.type?.name]}}>
                  <tr className="gap-5 text-center text-[1px] ">
                      <th className=" font-semibold text-[#ffff] px-10 text-[10px] ">names</th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">Type</th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">cat</th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">power</th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">accuracy</th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">pp</th>
                    <th className=" text-[10px]  px-1  font-semibold text-[#ffff]  border-l-2 border-l-slate-400 border-solid">effect</th>
                  </tr>
                </thead>
                <tbody className="text-[15px] text-[#331b03] text-center ">
                  {pokemon.moves?.map((move,i) => {
                    return (
                      <>
                        <tr className=" even:bg-[#d0e4f5] ">
                          <Moves moveUrl={move.move.url} index={i} color={colorType[pokemon?.types[0]?.type?.name]} />
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
          <button className="fixed right-4 bottom-4 w-[50px] h-[50px] bg-black" onClick={()=> topFunction()} >
                  <FontAwesomeIcon icon={faArrowUp} className="text-white w-full h-full" />
          </button>
        </div>
      ) : (
        <div className="w-screen h-screen text-center bg-white text-white flex justify-center items-center ">
          {" "}
          <div className="spinner rounded-[50%]  border-b-2 w-20 h-20 animate-spin border-gray-900 border-solid"></div>
        </div>
      )}
    </>
  );
};

export default SinglePokemon;
