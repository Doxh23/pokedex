import { useEffect, useState } from "react";
import { api } from "../utils";
import { useParams } from "react-router-dom";
import { colorType } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faVenus,
  faQuestionCircle,
  faCross,
  faCrosshairs,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import waitForElementTransition from "wait-for-element-transition";
const SinglePokemon = () => {
  const [pokemon, setpokemon] = useState({});
  const [loading, setloading] = useState(true);
  const [tabActive, settabActive] = useState("About");
  const [evolution, setEvolution] = useState({});
  const [PokemonColor, setPokemonColor] = useState("");
  const [test, settest] = useState(true);
  const [ability, setability] = useState("");
  const { id } = useParams();

  const fetchAbility = async (url) => {
    const res = await api(url);
    setability(res);
    // console.log(ability);
  };
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
  const RatioToPercent = (ratio) => {
    return ((100 / (ratio + 1)) * ratio).toFixed(0);
  };
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
          className="card-singlePokemon  w-full h-full"
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
                <p>
                  {pokemon.species
                    ? pokemon.flavor_text_entries[15].flavor_text
                    : ""}
                </p>
                <div
                  className={`morphology w-7/12 m-auto my-10 flex 
                   flex-row justify-center gap-20 shadow-lg shadow-slate-600 rounded`}
                  style={{
                    backgroundColor: colorType[pokemon?.types[0]?.type?.name],
                  }}
                >
                  <div className="weight my-auto">
                    <p className="text-white my-2 font-bold">Weight</p>
                    <hr />
                    <p className="text-white font-light">{pokemon.weight}</p>
                  </div>
                  <div className="height">
                    <p className="text-white my-2 font-bold ">Height</p>
                    <hr className="" />
                    <p className="text-white font-light">{pokemon.height}</p>
                  </div>
                </div>
                <div
                  className={`general w-[80%] relative py-3 m-auto shadow-lg text-white shadow-slate-600 rounded`}
                  style={{
                    background: colorType[pokemon?.types[0]?.type?.name],
                  }}
                >
                  <div className="details-abilities absolute w-0  h-full top-0 rounded transition-opacity_2s]  opacity-0 left-0  duration-500 border border-solid border-red-900 items-center  z-10 bg-gray-600 flex-col gap-5 ">
                    <div className="w-full  flex justify-end">
                      <button
                        onClick={() => {
                          document.getElementsByClassName(
                            "details-abilities"
                          )[0].style.width = "0%";
                          document.getElementsByClassName(
                            "details-abilities"
                          )[0].style.opacity = 0;
                          waitForElementTransition(
                            document.getElementsByClassName(
                              "details-abilities"
                            )[0]
                          ).then(() => {
                            setability(false);
                          });
                        }}
                        className="bg-gray-800 gap-7 w-10 h-5 rounded-bl "
                      >
                        {" "}
                        {
                          <FontAwesomeIcon
                            icon={faX}
                            className=" text-blue-400"
                          />
                        }
                      </button>
                    </div>
                    {ability ? (
                      <>
                        <h3 className={` underline mb-5`}>{ability?.name}</h3>
                        <p>
                          {Object.keys(ability?.effect_entries).map(
                            (key, index) => {
                              if (
                                ability?.effect_entries[key].language.name ===
                                "en"
                              ) {
                                return (
                                  <>{ability?.effect_entries[key].effect}</>
                                );
                              }
                            }
                          )}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="breading  ml-5  flex flex-col items-start">
                    <h3 className="text-slate-900 w-full font-black">
                      Breading
                    </h3>
                    <div className="Gender flex flex-row gap-4 w-full pl-[20%] justify-start">
                      <h4 className="text-start text-slate-500 w-2/6 ">
                        Gender:
                      </h4>
                      <p>
                        {" "}
                        <FontAwesomeIcon
                          icon={faMars}
                          className="text-blue-200"
                        />{" "}
                        {100 - RatioToPercent(pokemon.gender_rate)}
                      </p>
                      <p className="female flex flex-row gap-4 ">
                        <FontAwesomeIcon
                          icon={faVenus}
                          className=" text-pink-400"
                        />{" "}
                        {RatioToPercent(pokemon.gender_rate)}
                      </p>
                    </div>
                    <div className="eggGroup flex flex-row gap-4 justify-start pl-[20%] w-full ">
                      <h4 className="text-start text-slate-500 w-2/6 ">
                        Egg group:
                      </h4>
                      <div className="eggType">
                        {" "}
                        {pokemon.egg_groups[0].name}{" "}
                      </div>
                    </div>
                    <div className="eggCycle flex flex-row mx-2/6 w-full justify-start pl-[20%]  gap-4">
                      <h4 className="text-start text-slate-500 w-2/6 ">
                        egg cycle
                      </h4>
                      <div className="eggCycle">
                        {pokemon.types[0].type.name}
                      </div>
                    </div>
                  </div>

                  {/*  */}
                  <div className="abilities ml-5 flex-col">
                    <h2 className="text-slate-900 w-full font-black">
                      {" "}
                      Talents
                    </h2>

                    <div className="talents flex flex-row justify-evenly">
                      {pokemon.abilities?.map((ability) => {
                        return (
                          <>
                            {" "}
                            <div
                              className={`ability-${ability.ability.name} flex gap-2 flex-row`}
                            >
                              {" "}
                              <p key={ability.ability.name}>
                                {ability.ability.name}
                              </p>
                              <FontAwesomeIcon
                                icon={faQuestionCircle}
                                className=" text-blue-400"
                                onClick={async () => {
                                  await fetchAbility(ability.ability.url)
                                    .then(
                                      (document.getElementsByClassName(
                                        "details-abilities"
                                      )[0].style.width = "100%")
                                    )
                                    .then(
                                      (document.getElementsByClassName(
                                        "details-abilities"
                                      )[0].style.opacity = 1)
                                    );
                                }}
                              />
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/*  */}
                </div>
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

            {/*
        <div className="moves hidden">
            {pokemon.moves?.map((move) => {  return <p key={move.move.name}>{move.move.name}</p> })}
        </div>
        
        <div className="moves hidden">
            {pokemon.moves?.map((move) => {  return <p key={move.move.name}>{move.move.name}</p> })}
        </div> */}
          </div>
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
