import { useEffect, useState } from "react";
import { api } from "../utils";
import { useParams } from "react-router-dom";
import  {colorType} from "../utils"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMars,faVenus} from '@fortawesome/free-solid-svg-icons'
const SinglePokemon = () => {
  const [pokemon, setpokemon] = useState({});
  const [loading, setloading] = useState(true)
  const [tabActive, settabActive] = useState("About")
  const [PokemonColor, setPokemonColor] = useState("")
  const handleTabsChange = (e) =>{
    let tabs = ""
    switch (e) {
        case "About":
            tabs="About"
            break;
        case "Evolution":
            tabs="Evolution"
            break
        case "BaseStats":
            tabs="BaseStats"
            break
        case "Moves":
            tabs="Moves"
            break
        default:
            tabs = null
            break;
    }

    settabActive(tabs)
  }
  const params = useParams();
   const RatioToPercent = (ratio) => {  return (100/(ratio+1)*ratio).toFixed(0) }   
  useEffect(() => {
    let data1 = {};
    let data2 = {};
    const fetchData = async () => {
      data1 = await api(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    data2 = await api(data1.species.url);
    
         setpokemon({    ...data1,   ...data2});
        setloading(false)
            
    };
    fetchData();

  }, []);
  console.log(pokemon)
  return (
    <>
                
    {!loading? (<div className="card-singlePokemon  w-full h-full" style={{backgroundColor: colorType[pokemon?.types[0]?.type?.name],color: "black" }}>
        <h1 className="name" >{pokemon.name}</h1>
        <div className="sprite w-1/5 flex m-auto">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`} className="m-auto min-w-full min-h-full" alt={pokemon.name} />
        </div>
        <div  className=" m-auto rounded-t-[75px] bg-white mb-2  information w-full h-full">
        <div className="types flex flex-column justify-around pt-2">
            {pokemon.types?.map((type) => {  return <p key={type.type.name}>{type.type.name}</p> })}
        </div>
       
        <div className="onglet flex flex-row w-full pt-[20px] justify-between">
                <div style={tabActive === "About"? {color: colorType[pokemon?.types[0]?.type?.name]}: null} onClick={()=> handleTabsChange("About")} className="about  hover:text-red-500 font-semibold w-full cursor-pointer  text-center"> about</div>
                <div style={tabActive === "BaseStats"? {color: colorType[pokemon?.types[0]?.type?.name]}: null} onClick={()=> handleTabsChange("BaseStats")}  className="carac w-full text-center hover:text-red-500 font-semibold cursor-pointer"> Base stats</div>
                <div style={tabActive === "Evolution"? {color:colorType[pokemon?.types[0]?.type?.name]}: null} onClick={()=> handleTabsChange("Evolution")} className="ability w-full text-center hover:text-red-500 font-semibold cursor-pointer"> Evolution</div>
                <div style={tabActive === "Moves"? {color: colorType[pokemon?.types[0]?.type?.name]}: null} onClick={()=> handleTabsChange("Moves")} className="moves w-full text-center hover:text-red-500 font-semibold cursor-pointer"> Moves</div>
            </div>
            <hr className="bg-slate-400 mx-auto my-5 w-11/12 text-slate-600" />
        <div className="carac-general flex flex-col w-full  rounded-lg ">
        <div className="about text-center" style={tabActive === "About"? {display: "inline"}: {display: "none"}} onClick={()=> handleTabsChange("About")}>
            <p>{pokemon.species? (pokemon.flavor_text_entries[15].flavor_text ): "" }</p>
            <div className="morphology w-7/12 m-auto my-10 flex flex-row justify-center gap-20 shadow-lg shadow-slate-600 rounded border border-solid border-slate-300">
                <div className="weight my-auto">
                    <p className="text-gray-500 my-2">Weight</p>
                    <hr />
                    <p>{pokemon.weight}</p>
                </div>
                <div className="height">
                    <p className="text-gray-500 my-2">Height</p>
                    <hr className=""/>
                    <p>{pokemon.height}</p>
                    </div>
            </div>
            <div className="breading  ml-5  flex flex-col items-start">
                <h3 className="text-slate-900 font-black">Breading</h3>
                <div className="Gender flex flex-row gap-4 w-full gap">
                    <h4 className="text-start text-slate-500 w-1/6">Gender</h4>
                    <p>     <FontAwesomeIcon icon={faMars} className="text-blue-200" /> {100-RatioToPercent(pokemon.gender_rate)}</p> 
                    <p className="female flex flex-row gap-4 "> 
                    <FontAwesomeIcon icon={faVenus} className=" text-pink-400" /> {RatioToPercent(pokemon.gender_rate)}
                     </p>
                </div>
                <div className="eggGroup flex flex-row gap-4  w-full ">
                    <h4 className="text-start text-slate-500 w-1/6 ">Egg group</h4>
                    <div className="eggType"> {pokemon.egg_groups[0].name} </div>
                </div>
                <div className="eggCycle flex flex-row  w-full gap-4">
                    <h4 className="text-start text-slate-500 w-1/6 " >egg cycle</h4> 
                    <div className="eggCycle">{pokemon.types[0].type.name}</div>    
                </div>

            </div>
       </div>
        <div className="stats w-full m-auto">
            {pokemon.stats?.map((stat) => {  return <p key={stat.stat.name}>{stat.stat.name} : {stat.base_stat}</p> })}
        </div>
        </div>
       
        {/* <div className="abilities hidden">
            {pokemon.abilities?.map((ability) => {  return <p key={ability.ability.name}>{ability.ability.name}</p> })}
        </div>
        <div className="moves hidden">
            {pokemon.moves?.map((move) => {  return <p key={move.move.name}>{move.move.name}</p> })}
        </div>
        <div className="evolutions hidden">
            {pokemon.evolutions?.map((evolution) => {  return <p key={evolution.to}>{evolution.to}</p> })}
        </div>
        <div className="moves hidden">
            {pokemon.moves?.map((move) => {  return <p key={move.move.name}>{move.move.name}</p> })}
        </div> */}
        </div>


    </div>) : (<div>Loading...</div>)}
    
    </>
  )
};

export default SinglePokemon;
