import { useEffect, useState } from "react";
import { api } from "../utils";
import { useParams } from "react-router-dom";
import  {colorType} from "../utils"
const SinglePokemon = () => {
  const [pokemon, setpokemon] = useState({});
  const [loading, setloading] = useState(true)
  const params = useParams();
  useEffect(() => {
    let data = {};
    const fetchData = async () => {
      data = await api(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
        setpokemon(data);
        setloading(false)
    };
    fetchData();
  }, []);
  console.log(pokemon)
  return (
    <>
    {!loading? (<div className="card-singlePokemon  w-full" style={{backgroundColor: colorType[pokemon.types[0].type.name],color: "white" }}>
        <h1 className="name" >{pokemon.name}</h1>
        <div className="sprite w-1/5 m-auto">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`} className="m-auto" alt={pokemon.name} />
        </div>
        <div  className=" m-auto rounded-t-[75px] bg-purple-900  information w-full">
           
       
        <div className="onglet flex flex-row w-full   pt-[40px] justify-between">
                <div  className="about  border border-solid w-full  border-slate-600 text-center"> about</div>
                <div className="carac w-full text-center"> Base stats</div>
                <div className="ability w-full text-center"> Evolution</div>
                <div className="moves w-full text-center"> Moves</div>
            </div>
        <div className="carac-general flex flex-col w-full  rounded-lg ">
        <div className="types">
            {pokemon.types?.map((type) => {  return <p key={type.type.name}>{type.type.name}</p> })}
        </div>
        <div className="stats">
            {pokemon.stats?.map((stat) => {  return <p key={stat.stat.name}>{stat.stat.name} : {stat.base_stat}</p> })}
        </div>
        </div>
       
        <div className="abilities">
            {pokemon.abilities?.map((ability) => {  return <p key={ability.ability.name}>{ability.ability.name}</p> })}
        </div>
        <div className="moves">
            {pokemon.moves?.map((move) => {  return <p key={move.move.name}>{move.move.name}</p> })}
        </div>
        <div className="evolutions">
            {pokemon.evolutions?.map((evolution) => {  return <p key={evolution.to}>{evolution.to}</p> })}
        </div>
        <div className="moves">
            {pokemon.moves?.map((move) => {  return <p key={move.move.name}>{move.move.name}</p> })}
        </div>
        </div>


    </div>) : (<div>Loading...</div>)}
    
    </>
  )
};

export default SinglePokemon;
