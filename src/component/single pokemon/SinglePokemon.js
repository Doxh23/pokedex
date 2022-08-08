import { useEffect, useState } from "react";
import { api } from "../utils";
import { useParams } from "react-router-dom";
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
    {!loading? (<div className="card-singlePokemon  p-0 w-full" style={{color: "white"}}>
        <h1 className="name">{pokemon.name}</h1>
        <div className="sprite">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`} alt={pokemon.name} />
        </div>
        <div className="carac-general flex w-12/12 m-0 bg-slate-200">
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


    </div>) : (<div>Loading...</div>)}
    
    </>
  )
};

export default SinglePokemon;
